import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Users, PartyPopper, Home } from "lucide-react";

// Animation Variants
const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function ConfirmedBooking() {
  const navigate = useNavigate();
  
  // Retrieve saved reservation data from localStorage
  const rawData = localStorage.getItem("bookingData");
  const bookingData = rawData ? JSON.parse(rawData) : null;

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        backgroundColor: "#f9f9f9", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px 20px" 
      }}
    >
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={scaleUp}
        style={{
          maxWidth: "850px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        {/* Left Card Info */}
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div variants={fadeInUp} style={{ textAlign: "center", marginBottom: "24px" }}>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              style={{ display: "inline-block", marginBottom: "12px" }}
            >
              <CheckCircle2 size={56} color="var(--color-primary-green, #495E57)" />
            </motion.div>
            <h2 style={{ fontSize: "28px", color: "var(--color-primary-green, #495E57)", marginBottom: "8px" }}>
              Booking Confirmed!
            </h2>
            <p style={{ fontSize: "14px", color: "#666" }}>
              We look forward to hosting you at Little Lemon Chicago.
            </p>
          </motion.div>

          {bookingData ? (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ marginBottom: "28px" }}>
              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                <Calendar size={18} color="var(--color-primary-yellow, #F4CE14)" />
                <span style={{ fontSize: "14px", color: "#333" }}>
                  <strong>Date:</strong> {bookingData.date}
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                <Clock size={18} color="var(--color-primary-yellow, #F4CE14)" />
                <span style={{ fontSize: "14px", color: "#333" }}>
                  <strong>Time:</strong> {bookingData.time}
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                <Users size={18} color="var(--color-primary-yellow, #F4CE14)" />
                <span style={{ fontSize: "14px", color: "#333" }}>
                  <strong>Guests:</strong> {bookingData.guests} People
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0" }}>
                <PartyPopper size={18} color="var(--color-primary-yellow, #F4CE14)" />
                <span style={{ fontSize: "14px", color: "#333" }}>
                  <strong>Occasion:</strong> {bookingData.occasion}
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.p variants={fadeInUp} style={{ fontSize: "14px", color: "#555", textAlign: "center", marginBottom: "28px" }}>
              Your reservation has been successfully confirmed.
            </motion.p>
          )}

          <motion.div variants={fadeInUp}>
            <motion.button 
              className="btn-primary" 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                padding: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "var(--color-primary-yellow, #F4CE14)",
                color: "var(--color-highlight-dark, #333333)"
              }}
            >
              <Home size={18} /> Return to Home
            </motion.button>
          </motion.div>
        </div>

        {/* Right Image Wrapper */}
        <div style={{ position: "relative", height: "100%", minHeight: "350px" }}>
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            alt="Little Lemon Restaurant Table and Chairs"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}