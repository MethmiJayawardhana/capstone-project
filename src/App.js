import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, UtensilsCrossed } from 'lucide-react';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import './App.css';

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// API Helper Functions for Reservation State
export const initializeTimes = () => {
  const today = new Date();
  return typeof window.fetchAPI !== "undefined" 
    ? window.fetchAPI(today) 
    : ["17:00", "18:00", "19:00", "20:00"];
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const selectedDate = new Date(action.payload);
      return typeof window.fetchAPI !== "undefined" 
        ? window.fetchAPI(selectedDate) 
        : state;
    }
    default:
      return state;
  }
};

// Main Content Component with Navigation & Sections
function MainContent({ availableTimes, dispatch, submitForm }) {
  return (
    <div className="little-lemon-app">
      {/* 1. NAVIGATION BAR */}
      <nav style={{ backgroundColor: '#ffffff', padding: '15px 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UtensilsCrossed color="var(--color-primary-green)" size={28} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary-green)', letterSpacing: '1px' }}>
              LITTLE LEMON
            </span>
          </div>
          <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', fontWeight: '700', fontSize: '15px' }}>
            <li><a href="#home" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>HOME</a></li>
            <li><a href="#about" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>ABOUT</a></li>
            <li><a href="#menu" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>MENU</a></li>
            <li><a href="#reservations" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>RESERVATIONS</a></li>
            <li><a href="#order" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>ORDER ONLINE</a></li>
            <li><a href="#login" style={{ color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>LOGIN</a></li>
          </ul>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="home" style={{ backgroundColor: 'var(--color-primary-green)', padding: '40px 0', color: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 style={{ color: 'var(--color-primary-yellow)', fontSize: '56px', lineHeight: '1' }}>Little Lemon</h1>
            <h2 style={{ fontSize: '32px', color: '#EDEFEE', marginBottom: '16px' }}>Chicago</h2>
            <p style={{ fontSize: '18px', maxWidth: '400px', marginBottom: '24px', color: '#EDEFEE' }}>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <a href="#reservations">
              <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Reserve a Table
              </motion.button>
            </a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" 
              alt="Little Lemon Restaurant Dish" 
              style={{ width: '320px', height: '360px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            />
          </motion.div>
        </div>
      </header>

      {/* 3. HIGHLIGHTS / SPECIALS SECTION */}
      <section id="menu" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '40px', color: 'var(--color-highlight-dark)' }}>This weeks specials!</h2>
            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Online Menu
            </motion.button>
          </div>

          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Greek Salad */}
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8 }}
              style={{ backgroundColor: 'var(--color-highlight-light)', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
            >
              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" alt="Greek Salad" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Greek salad</h3>
                  <span style={{ color: 'var(--color-secondary-peach)', fontWeight: 'bold' }}>$12.99</span>
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.
                </p>
                <a href="#order" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>
                  Order a delivery <ShoppingBag size={16} />
                </a>
              </div>
            </motion.div>

            {/* Bruschetta */}
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8 }}
              style={{ backgroundColor: 'var(--color-highlight-light)', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
            >
              <img src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80" alt="Bruschetta" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Bruschetta</h3>
                  <span style={{ color: 'var(--color-secondary-peach)', fontWeight: 'bold' }}>$5.99</span>
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.
                </p>
                <a href="#order" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>
                  Order a delivery <ShoppingBag size={16} />
                </a>
              </div>
            </motion.div>

            {/* Lemon Dessert */}
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8 }}
              style={{ backgroundColor: 'var(--color-highlight-light)', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}
            >
              <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80" alt="Lemon Dessert" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Lemon Dessert</h3>
                  <span style={{ color: 'var(--color-secondary-peach)', fontWeight: 'bold' }}>$5.00</span>
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.
                </p>
                <a href="#order" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: 'var(--color-highlight-dark)', textDecoration: 'none' }}>
                  Order a delivery <ShoppingBag size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. RESERVATION SECTION */}
      <section id="reservations" style={{ padding: '30px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px', color: 'var(--color-primary-green)' }}>Reserve a Table</h2>
          <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section style={{ backgroundColor: 'var(--color-highlight-light)', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '40px' }}>Testimonials</h2>
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Sara L.', rating: 5, text: 'Great food and atmosphere!' },
              { name: 'John D.', rating: 5, text: 'The lemon dessert is to die for.' },
              { name: 'Alice M.', rating: 4, text: 'Authentic Mediterranean flavors.' },
              { name: 'Robert K.', rating: 5, text: 'Fantastic service and friendly staff.' }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp} 
                style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', gap: '4px', color: 'var(--color-primary-yellow)', marginBottom: '8px' }}>
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="var(--color-primary-yellow)" />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-light-peach)' }} />
                  <span style={{ fontWeight: 'bold' }}>{review.name}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#555' }}>"{review.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section id="about" style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h1 style={{ color: 'var(--color-primary-green)', fontSize: '48px', lineHeight: '1' }}>Little Lemon</h1>
            <h2 style={{ fontSize: '28px', color: '#666', marginBottom: '20px' }}>Chicago</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </motion.div>
          <div style={{ position: 'relative', height: '300px' }}>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" 
              alt="Mario and Adrian cooking" 
              style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '8px', position: 'absolute', top: '0', right: '0', zIndex: 1 }}
            />
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80" 
              alt="Mario and Adrian in restaurant" 
              style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '8px', position: 'absolute', bottom: '0', left: '20px', zIndex: 2 }}
            />
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{ backgroundColor: 'var(--color-primary-green)', color: '#ffffff', padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <UtensilsCrossed color="var(--color-primary-yellow)" size={40} />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary-yellow)', marginBottom: '12px' }}>Doormat Navigation</h4>
            <ul style={{ listStyle: 'none', fontSize: '14px', lineHeight: '2' }}>
              <li>Home</li>
              <li>About</li>
              <li>Menu</li>
              <li>Reservations</li>
              <li>Order Online</li>
              <li>Login</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary-yellow)', marginBottom: '12px' }}>Contact</h4>
            <p style={{ fontSize: '14px', lineHeight: '2' }}>Address<br/>Phone number<br/>Email</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary-yellow)', marginBottom: '12px' }}>Social Media Links</h4>
            <p style={{ fontSize: '14px', lineHeight: '2' }}>Address<br/>Phone number<br/>Email</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Router Container Component
function MainApp() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // Step 2: Form submission function saving to localStorage & calling submitAPI
  const submitForm = (formData) => {
    const isSubmitted = typeof window.submitAPI !== "undefined" 
      ? window.submitAPI(formData) 
      : true;

    if (isSubmitted) {
      localStorage.setItem("bookingData", JSON.stringify(formData));
      navigate('/booking-confirmed');
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MainContent 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
            submitForm={submitForm} 
          />
        } 
      />
      <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}