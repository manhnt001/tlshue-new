import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Eye, TrendingUp } from "lucide-react";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { ref, onValue, set, push, onDisconnect, runTransaction } from "firebase/database";

export function VisitorStats() {
  const [onlineUsers, setOnlineUsers] = useState(() => {
    return isFirebaseConfigured ? 1 : 142;
  });
  const [totalVisitors, setTotalVisitors] = useState(() => {
    return isFirebaseConfigured ? 0 : 84592;
  });

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      // Chạy hiệu ứng giả lập nếu không có cấu hình Firebase
      const interval = setInterval(() => {
        setOnlineUsers(prev => {
          const change = Math.floor(Math.random() * 5) - 2;
          const newValue = prev + change;
          return newValue < 1 ? 1 : newValue;
        });
      }, 5000);
      return () => clearInterval(interval);
    }

    // ---- CẤU HÌNH THẬT BẰNG FIREBASE ----
    
    // 1. Quản lý trạng thái trực tuyến (Presence)
    const myPresenceRef = push(ref(db, "presence"));
    const connectedRef = ref(db, ".info/connected");

    const unsubscribeConnect = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        onDisconnect(myPresenceRef).remove();
        set(myPresenceRef, true);
      }
    });

    const presenceRef = ref(db, "presence");
    const unsubscribeOnline = onValue(presenceRef, (snapshot) => {
      const onlineCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      setOnlineUsers(onlineCount > 0 ? onlineCount : 1);
    });

    // 2. Quản lý tổng lượt truy cập (Total Visits)
    const totalVisitsRef = ref(db, "total_visits");

    // Chỉ đếm khi bắt đầu một phiên trình duyệt mới (tránh F5 tăng liên tục)
    if (!sessionStorage.getItem("has_visited")) {
      runTransaction(totalVisitsRef, (currentValue) => {
        return (currentValue || 0) + 1;
      }).then(() => {
        sessionStorage.setItem("has_visited", "true");
      }).catch(err => {
        console.error("Lỗi ghi nhận lượt truy cập:", err);
      });
    }

    const unsubscribeTotal = onValue(totalVisitsRef, (snapshot) => {
      if (snapshot.exists()) {
        setTotalVisitors(snapshot.val());
      } else {
        setTotalVisitors(1);
      }
    });

    return () => {
      unsubscribeConnect();
      unsubscribeOnline();
      unsubscribeTotal();
      try {
        set(myPresenceRef, null);
      } catch (e) {
        // Bỏ qua lỗi khi tắt kết nối
      }
    };
  }, []);


  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h4 className="text-white font-serif font-medium mb-4 text-base border-b border-white/10 pb-3">
        Thống kê truy cập
      </h4>
      
      <div className="space-y-4">
        {/* Current Online */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye size={16} className="text-primary" />
            </div>
            <span className="text-sm text-white/70">Đang truy cập</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <motion.span 
              key={onlineUsers}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-medium font-number"
            >
              {onlineUsers.toLocaleString()}
            </motion.span>
          </div>
        </div>

        {/* Total Visitors */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-primary" />
            </div>
            <span className="text-sm text-white/70">Tổng lượt truy cập</span>
          </div>
          <div className="flex items-center">
            <span className="text-primary font-medium font-number text-lg tracking-wider">
              {totalVisitors.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
