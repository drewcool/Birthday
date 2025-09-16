'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';

const BirthdayAnimation = () => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [showHeadphone, setShowHeadphone] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [slapCount, setSlapCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side to prevent hydration issues
    if (!isClient) return;
    // Show headphone prompt first
    setShowHeadphone(true);
  }, [isClient]);

  const handleHeadphoneOk = () => {
    setShowHeadphone(false);
    setShowConsent(true);
  };

  const handleConsent = (playMusic) => {
    setShowConsent(false);
    if (playMusic && audioRef.current) {
      // start once; no loop; when ends, isPlaying will be false
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
    animationTimeline();
  };

  const animationTimeline = () => {
    const tl = gsap.timeline();

    // Split text for animation
    const textBoxChars = document.querySelector('.hbd-chatbox');
    const hbd = document.querySelector('.wish-hbd');

    if (textBoxChars) {
      textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split('')
        .join('</span><span>')}</span>`;
    }

    if (hbd) {
      hbd.innerHTML = `<span>${hbd.innerHTML
        .split('')
        .join('</span><span>')}</span>`;
    }

    // No special split animation for button in original happybirthday version

    const ideaTextTrans = {
      opacity: 0,
      y: -20,
      rotationX: 5,
      skewX: '15deg'
    };

    const ideaTextTransLeave = {
      opacity: 0,
      y: 20,
      rotationY: 5,
      skewX: '-15deg'
    };

    // Animation timeline
    tl.to('.container', 0.6, { visibility: 'visible' })
      .from('.one', 0.7, { opacity: 0, y: 10 })
      .from('.two', 0.4, { opacity: 0, y: 10 })
      .to('.one', 0.7, { opacity: 0, y: 10 }, '+=3.5')
      .to('.two', 0.7, { opacity: 0, y: 10 }, '-=1')
      .from('.three', 0.7, { opacity: 0, y: 10 })
      .to('.three', 0.7, { opacity: 0, y: 10 }, '+=3')
      .from('.four', 0.7, { scale: 0.2, opacity: 0 })
      .from('.fake-btn', 0.3, { scale: 0.2, opacity: 0 })
      .staggerTo('.hbd-chatbox span', 1.5, { visibility: 'visible' }, 0.05)
      // Button color nudge like original
      .to('.fake-btn', 0.1, { backgroundColor: 'rgb(127, 206, 248)' }, '+=4')
      .to('.four', 0.5, { scale: 0.2, opacity: 0, y: -150 }, '+=1')
      .from('.idea-1', 0.7, ideaTextTrans)
      .to('.idea-1', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-2', 0.7, ideaTextTrans)
      .to('.idea-2', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-3', 0.7, ideaTextTrans)
      .to('.idea-3 strong', 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: '#ffd1e8',
        color: '#1a1a1a',
      })
      .to('.idea-3', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-4', 0.7, ideaTextTrans)
      .to('.idea-4', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-5', 0.7, {
        rotationX: 15,
        rotationZ: -10,
        skewY: '-5deg',
        y: 50,
        z: 10,
        opacity: 0,
      }, '+=1.5')
      .to('.idea-5 span', 0.7, { rotation: 90, x: 8 }, '+=1.4')
      .to('.idea-5', 0.7, { scale: 0.2, opacity: 0 }, '+=2')
      .staggerFrom('.idea-6 span', 0.8, {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: 'expo.out',
      }, 0.2)
      .staggerTo('.idea-6 span', 0.8, {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: 'expo.out',
      }, 0.2, '+=1.5')
      .call(() => {
        setShowGame(true);
      });
  };

  const playPostGameTimeline = () => {
    const tl = gsap.timeline();
    // ensure they are in DOM and visible for animation
    gsap.set('.six', { visibility: 'visible', opacity: 0 });
    gsap.set('.seven, .eight, .nine', { visibility: 'visible', opacity: 1 });
    gsap.set('.baloons img', { opacity: 0, y: 1400 });
    gsap.set('.profile-picture', { opacity: 0, scale: 3.5, x: 25, y: -25, rotationZ: -45 });
    gsap.set('.hat', { opacity: 0, x: -100, y: 350, rotation: -180 });
    gsap.set('.wish-hbd span', { opacity: 0, y: -50, rotation: 150, skewX: '30deg' });
    gsap.set('.wish h5', { opacity: 0, y: 10, skewX: '-15deg' });
    gsap.set('.eight svg', { visibility: 'hidden', opacity: 0, scale: 1 });
    // Final card initial state (offscreen, hidden). Split final text into words
    const finalMsg = document.querySelector('.final-message');
    if (finalMsg && !finalMsg.dataset.split) {
      const text = finalMsg.innerText.trim().replace(/\s+/g, ' ');
      const words = text.split(' ');
      finalMsg.innerHTML = words
        .map((w, i) => `<span class="word">${w}${i < words.length - 1 ? ' ' : ''}</span>`) 
        .join('');
      finalMsg.dataset.split = '1';
    }
    gsap.set('.nine', { y: -30, opacity: 0, display: 'none', visibility: 'hidden' });
    gsap.set('.final-message .word', { opacity: 0 });
    // Keep intro simple to avoid text pushing outside the card
    // Do NOT hide the final-message paragraph itself, only the smile line
    gsap.set('.nine p:not(.final-message)', { opacity: 0, y: 8, rotationX: 0, skewX: '0deg' });
    gsap.set('.last-smile', { rotation: 0 });
    
    tl.to('.seven', { opacity: 1, duration: 0.2 })
      .staggerFromTo('.baloons img', 2.5, {
      opacity: 0.9,
      y: 1400,
    }, {
      opacity: 1,
      y: -1000,
    }, 0.2)
      .to('.six', { opacity: 1, duration: 0.2 })
      .to('.profile-picture', 0.5, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotationZ: 0,
        ease: 'expo.out'
      })
      .to('.hat', 0.5, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: 'expo.out'
      })
      .to('.wish-hbd span', 0.6, {
        opacity: 1,
        y: 0,
        rotation: 0,
        skewX: '0deg',
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)'
      })
      .to('.wish-hbd span', 0.7, {
        scale: 1,
        rotationY: 0,
        color: '#ff3fa4',
        stagger: 0.1,
        ease: 'expo.out'
      }, '>-0.3')
      .to('.wish h5', 0.5, {
        opacity: 1,
        y: 0,
        skewX: '0deg'
      })
      // Show confetti section and animate (smooth, one-by-one)
      .set('.eight', { display: 'block', visibility: 'visible' })
      .to('.eight', { opacity: 1, duration: 0.2 })
      .staggerFromTo(
        '.eight svg',
        1.6,
        { visibility: 'visible', opacity: 1, scale: 1 },
        { opacity: 0, scale: 80, ease: 'expo.out', repeat: 2, repeatDelay: 0 },
        0.28
      )
      .set('.eight svg', { visibility: 'hidden', opacity: 1, scale: 1 })
      // Now hide section six after confetti has finished
      .to('.six', { opacity: 0, y: 30, duration: 0.5 })
      .set('.six', { zIndex: -1 })
      // Reveal final message card only after confetti completes
      .set('.nine', { display: 'block', visibility: 'visible', pointerEvents: 'auto' })
      .to('.nine', { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
      // small delay so user registers the card first
      .to({}, { duration: 0.5 })
      // Reveal message word-by-word while paragraph is visible (slower pace)
      .staggerTo('.final-message .word', 0.08, { opacity: 1, ease: 'power2.out' }, 0.05)
      // Fade in the smile line afterwards
      .to('.nine p.last-smile', { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' })
      .to('.last-smile', 0.5, { rotation: 90 }, '+=0.6')
      .call(() => setAnimationComplete(true));
  };

  const resetGameState = () => {
    setIsGameRunning(false);
    setSlapCount(0);
    setTimeLeft(20);
    setShowCongrats(false);
    setShowTryAgain(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startGame = () => {
    resetGameState();
    setShowGame(true);
    setIsGameRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsGameRunning(false);
          setShowTryAgain(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleSlap = () => {
    if (!showGame) return;
    if (!isGameRunning) return;
    setSlapCount((c) => {
      const next = c + 1;
      // Small slap animation
      gsap.fromTo('.game-character', { y: 0, rotation: 0 }, { y: -6, rotation: (Math.random() * 10) - 5, duration: 0.08, yoyo: true, repeat: 1 });
      if (next >= 20) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsGameRunning(false);
        setShowCongrats(true);
        // party popper burst
        setTimeout(() => {
          setShowCongrats(false);
          setPostVisible(true);
          playPostGameTimeline();
          setShowGame(false);
        }, 4000);
      }
      return next;
    });
  };

  const tryAgain = () => {
    resetGameState();
    startGame();
  };

  const restartAnimation = () => {
    setAnimationComplete(false);
    resetGameState();
    setShowGame(false);
    setPostVisible(false);
    animationTimeline();
  };

  const handleReplayClick = () => {
    // Full reset to guarantee clean DOM and timeline states
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (showCongrats) {
      // animate confetti elements in the congrats card
      gsap.fromTo('.congrats-confetti span', { y: -10, opacity: 0, scale: 0.6 }, {
        y: 10,
        opacity: 1,
        scale: 1,
        rotation: () => (Math.random() * 360) - 180,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1
      });
    }
  }, [showCongrats]);

  // Animate game card entrance when it appears
  useEffect(() => {
    if (!showGame) return;
    gsap.from('.game-section .retro-card', {
      y: -16,
      opacity: 0,
      scale: 0.985,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'transform,opacity'
    });
    gsap.from(['.game-hud > div', '.game-section .btn-row', '.game-character'], {
      opacity: 0,
      y: 8,
      duration: 0.6,
      stagger: 0.06,
      delay: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
    gsap.from('.floating-logos span', {
      opacity: 0,
      y: -6,
      rotation: 12,
      duration: 0.55,
      stagger: 0.04,
      delay: 0.15,
      ease: 'back.out(1.4)',
      clearProps: 'transform,opacity'
    });
  }, [showGame]);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffe9f2' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto" style={{ borderColor: '#ff3fa4' }}></div>
          <p className="mt-4 text-xl" style={{ color: '#ff3fa4' }}>Loading Birthday Magic...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Audio element */}
      <audio ref={audioRef} className="song" onEnded={() => setIsPlaying(false)}>
        <source src="/music/sharmeeli.mp3" type="audio/mpeg" />
        Your browser isn't invited for super fun audio time.
      </audio>

      {/* Retro Headphone Advice Overlay */}
      {showHeadphone && (
        <div className="music-consent-overlay">
          <div className="retro-card" style={{ position: 'relative' }}>
            <h3 style={{ color: '#ff3fa4' }}>For best experience, use headphones</h3>
            <p style={{ color: '#5b2b3a' }}>It enhances the retro vibes and spatial effects.</p>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <Button onClick={handleHeadphoneOk} className="shadow" style={{ backgroundColor: '#ff3fa4', color: '#fff' }}>OK</Button>
            </div>
          </div>
        </div>
      )}

      {/* Retro Music Consent Overlay */}
      {showConsent && (
        <div className="music-consent-overlay">
          <div className="retro-card" style={{ position: 'relative' }}>
            {/* Retro kitty stickers (inline SVG) */}
            <div className="retro-sticker s1">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#ffd1e8" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <path d="M16 18 L26 22 L18 10 Z" fill="#ff6fb3"/>
                <path d="M48 18 L38 22 L46 10 Z" fill="#ff6fb3"/>
                <path d="M22 42 C32 48 42 42 42 42" stroke="#0e0e0e" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="retro-sticker s2">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#fff5fb" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="32" cy="40" r="6" fill="#ff6fb3"/>
              </svg>
            </div>
            <div className="retro-sticker s3">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="28" fill="#fff" stroke="#ff3fa4" strokeWidth="4"/>
                <path d="M18 24 L26 28 L20 16 Z" fill="#ff6fb3"/>
                <path d="M46 24 L38 28 L44 16 Z" fill="#ff6fb3"/>
              </svg>
            </div>
            <div className="retro-sticker s4">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#ffd1e8" stroke="#ff3fa4" strokeWidth="4"/>
                <rect x="22" y="40" width="20" height="6" rx="3" fill="#0e0e0e"/>
              </svg>
            </div>
            <h3 style={{ color: '#ff3fa4' }}>Play background music?</h3>
            <p style={{ color: '#5b2b3a' }}>Say yes to start the retro birthday vibes!</p>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <Button onClick={() => handleConsent(true)} className="shadow" style={{ backgroundColor: '#ff3fa4', color: '#fff' }}>Yes, play</Button>
              <Button onClick={() => handleConsent(false)} variant="outline" className="shadow" style={{ borderColor: '#ff3fa4', color: '#ff3fa4' }}>No thanks</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Birthday Animation Container - EXACTLY matching original structure */}
      <div ref={containerRef} className="container" style={{ padding: '0 12px' }}>
        {/* Section 1: Greeting - EXACT original structure */}
        <div className="one" style={{ padding: '0 12px' }}>
          <h1 className="one">
            Hi <span id="name">Sonam</span>
          </h1>
          <p className="two" id="greetingText">I really like your name btw!</p>
        </div>

        {/* Section 2: Birthday announcement - EXACT original structure */}
        <div className="three" style={{ padding: '0 12px' }}>
          <p>It's your birthday!! :D</p>
        </div>

        {/* Section 3: Chat box - EXACT original structure */}
        <div className="four" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="text-box retro-card" style={{ position: 'relative', maxWidth: 920, width: '90%' }}>
            <div className="retro-content">
              <p className="hbd-chatbox">
                Happy birthday!! Have a good day :)
              </p>
            </div>
            {/* Cute retro kitty stickers on the card */}
            <div className="retro-sticker s1">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#ffd1e8" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <path d="M16 18 L26 22 L18 10 Z" fill="#ff6fb3"/>
                <path d="M48 18 L38 22 L46 10 Z" fill="#ff6fb3"/>
                <path d="M22 42 C32 48 42 42 42 42" stroke="#0e0e0e" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="retro-sticker s2">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#fff5fb" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="32" cy="40" r="6" fill="#ff6fb3"/>
              </svg>
            </div>
          </div>
          <p className="fake-btn">Send</p>
        </div>

        {/* Section 4: Ideas - EXACT original structure */}
        <div className="five">
          <p className="idea-1">That's what I was going to do.</p>
          <p className="idea-2">But then I stopped.</p>
          <p className="idea-3">
            I realised, I wanted to do something<br />
            <strong>special</strong>.
          </p>
          <p className="idea-4">Because,</p>
          <p className="idea-5">
            You are Special <span>:)</span>
          </p>
          <p className="idea-6">
            <span>S</span>
            <span>O</span>
          </p>
        </div>

        {/* Section 4.5: Cute Slap Mini-Game Card */}
        {showGame && (
          <div className="game-section" style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
            <div className="retro-card" style={{ maxWidth: 920, width: '92%', padding: 16, position: 'relative', overflow: 'hidden' }}>
              {/* floating cute logos */}
              <div className="floating-logos" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', left: 12, top: 12 }}>🎀</span>
                <span style={{ position: 'absolute', right: 18, top: 8 }}>✨</span>
                <span style={{ position: 'absolute', left: 22, bottom: 10 }}>💖</span>
                <span style={{ position: 'absolute', right: 18, bottom: 12 }}>🧁</span>
              </div>
              <h3 style={{ color: '#ff3fa4', textAlign: 'center', marginBottom: 8 }}>Let's play a Mini Game! Slap Me!</h3>
              <p style={{ color: '#5b2b3a', textAlign: 'center', marginBottom: 12 }}>Give 20 playful slaps on the face in 20 seconds!</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="game-hud" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ background: '#fff5fb', border: '2px solid #ffb3d6', color: '#ff3fa4', borderRadius: 12, padding: '6px 12px', minWidth: 88, textAlign: 'center' }}>Time: {timeLeft}s</div>
                  <div style={{ background: '#fff5fb', border: '2px solid #ffb3d6', color: '#ff3fa4', borderRadius: 12, padding: '6px 12px', minWidth: 88, textAlign: 'center' }}>Slaps: {slapCount}/20</div>
                </div>
                {!isGameRunning && (
                  <Button onClick={startGame} className="shadow" style={{ backgroundColor: '#ff3fa4', color: '#fff' }}>Start</Button>
                )}
              </div>

              {/* Character area */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <div onClick={handleSlap} className="game-character" style={{ cursor: isGameRunning ? 'pointer' : 'not-allowed', userSelect: 'none' }}>
                  {/* Cute character (inline SVG cat) */}
                  <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="34" r="20" fill="#ffd1e8" stroke="#ff3fa4" strokeWidth="2" />
                    <path d="M18 20 L26 24 L20 12 Z" fill="#ff6fb3"/>
                    <path d="M46 20 L38 24 L44 12 Z" fill="#ff6fb3"/>
                    <circle cx="26" cy="32" r="2.5" fill="#0e0e0e"/>
                    <circle cx="38" cy="32" r="2.5" fill="#0e0e0e"/>
                    <circle cx="32" cy="38" r="3" fill="#ff6fb3"/>
                    <path d="M24 42 C32 46 40 42 40 42" stroke="#0e0e0e" strokeWidth="2" fill="none"/>
                    <text x="32" y="60" textAnchor="middle" fontSize="6" fill="#ff3fa4">Me</text>
                  </svg>
                </div>
              </div>

              {/* Tips */}
              <p style={{ textAlign: 'center', color: '#5b2b3a', marginTop: 10 }}>slap on the face when the game is running. 20 slaps wins!</p>
            </div>
          </div>
        )}

        {/* Section 5: Profile and wish - EXACT original structure */}
        <div className="six" style={{ visibility: postVisible ? 'visible' : 'hidden', opacity: postVisible ? 1 : 0 }}>
          <img 
            src="/assets/sonamm.jpg" 
            alt="profile" 
            className="profile-picture" 
            id="imagePath"
          />
          <img 
            src="/assets/hat.svg" 
            alt="hat" 
            className="hat" 
          />
          <div className="wish">
            <h3 className="wish-hbd">Happy Birthday!</h3>
            <h5 id="wishText">May my blessings always be with you! ;)</h5>
          </div>
        </div>

        {/* Section 6: Balloons - EXACT original structure */}
        <div className="seven" style={{ visibility: postVisible ? 'visible' : 'hidden', opacity: postVisible ? 1 : 0 }}>
          <div className="baloons">
            {Array.from({ length: 30 }, (_, i) => (
              <img
                key={i}
                src={`/assets/ballon${(i % 3) + 1}.svg`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* Section 7: Confetti - EXACT original structure */}
        <div className="eight" style={{ visibility: 'hidden', opacity: 0, display: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
          {(() => {
            const confetti = [
              { fill: '#bd6ecf', left: '5vw', top: '7vh' },
              { fill: '#7dd175', left: '35vw', top: '23vh' },
              { fill: '#349d8b', left: '23vw', top: '33vh' },
              { fill: '#347a9d', left: '57vw', top: '43vh' },
              { fill: '#c66053', left: '7vw', top: '68vh' },
              { fill: '#bfaa40', left: '77vw', top: '42vh' },
              { fill: '#e3bae8', left: '83vw', top: '68vh' },
              { fill: '#8762cb', left: '37vw', top: '86vh' },
              { fill: '#9a90da', left: '87vw', top: '94vh' },
            ];
            return confetti.map((c, i) => (
              <svg
                key={i}
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 25, position: 'absolute', zIndex: -1, visibility: 'hidden', opacity: 0, left: c.left, top: c.top }}
              >
                <circle cx="20" cy="20" r="20" fill={c.fill} />
              </svg>
            ));
          })()}
        </div>

        {/* Section 8: Final message - Cute card with replay */}
        <div className="nine" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none', display: 'none' }}>
          <div className="retro-card" style={{ width: 'min(94%, 820px)', margin: '0 auto', padding: 'clamp(18px, 5vw, 28px)', paddingTop: 'clamp(30px, 6vw, 44px)', paddingBottom: 'clamp(20px, 2vh, 32px)', position: 'relative', overflow: 'visible' }}>
            {/* Cute stickers */}
            {/* move stickers to card corners outside text padding, keep fully visible */}
            <div className="retro-sticker s1" style={{ position: 'absolute', left: -10, top: -12, zIndex: 2 }}>
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
                <circle cx="32" cy="32" r="30" fill="#ffd1e8" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <path d="M16 18 L26 22 L18 10 Z" fill="#ff6fb3"/>
                <path d="M48 18 L38 22 L46 10 Z" fill="#ff6fb3"/>
              </svg>
            </div>
            <div className="retro-sticker s2" style={{ position: 'absolute', right: -10, top: -12, zIndex: 2 }}>
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
                <rect x="8" y="8" width="48" height="48" rx="12" fill="#fff5fb" stroke="#ff3fa4" strokeWidth="4"/>
                <circle cx="24" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="40" cy="28" r="4" fill="#0e0e0e"/>
                <circle cx="32" cy="40" r="6" fill="#ff6fb3"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <p className="final-message" style={{ margin: 0, color: '#0a0a0a', fontSize: 'clamp(16px, 3.8vw, 22px)', lineHeight: 1.6, letterSpacing: 0.2, fontStyle: 'normal' }}>I know I haven’t been able to do much for you, and I don’t even know if I’ll ever be able to do enough in the future. But for now, I’ve made this little site just for you. I truly hope you liked it, and that my small effort brought a smile to your face.
              All I really want is for you to always stay happy. Please don’t let yourself break down stay strong, because you deserve all the happiness in the world.
              Once again, happy birthday ❤️ And remember, my blessings and good wishes will always be with you, no matter what.</p>
              <p className="last-smile" style={{ marginTop: 6, fontStyle: 'normal', fontSize: 'clamp(18px, 5vw, 24px)' }}>:)</p>
              <div className="btn-row" style={{ marginTop: 'clamp(10px, 3vw, 14px)', display: 'flex', justifyContent: 'center', gap: 8 }}>
                <Button id="replay" onClick={handleReplayClick} className="shadow" style={{ backgroundColor: '#ff3fa4', color: '#fff' }}>Play Again</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Popups */}
      {showCongrats && (
        <div className="music-consent-overlay">
          <div className="retro-card" style={{ position: 'relative', textAlign: 'center' }}>
            <h3 style={{ color: '#ff3fa4' }}>Congratulations! 🎉</h3>
            <p style={{ color: '#5b2b3a' }}>You slapped me 20 times in 20 seconds!</p>
            <div className="congrats-confetti" style={{ marginTop: 10 }}>
              {Array.from({ length: 30 }, (_, i) => (
                <span key={i} style={{ display: 'inline-block', margin: '0 2px' }}>{['🎉','✨','💖','🎀','🎈'][i % 5]}</span>
              ))}
            </div>
            <p style={{ color: '#5b2b3a', marginTop: 12 }}>Get ready for the surprise...</p>
          </div>
        </div>
      )}

      {showTryAgain && (
        <div className="music-consent-overlay">
          <div className="retro-card" style={{ position: 'relative', textAlign: 'center' }}>
            <h3 style={{ color: '#ff3fa4' }}>Almost there!</h3>
            <p style={{ color: '#5b2b3a' }}>You didn't reach 20 taps. Try again?</p>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <Button onClick={tryAgain} className="shadow" style={{ backgroundColor: '#ff3fa4', color: '#fff' }}>Try Again</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayAnimation;