import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import './card.css';

export default function Cards({ swipeDirection, onSwipeComplete }) {
  const [cards, setCards] = useState(cardData);
  const [animatingCard, setAnimatingCard] = useState(null);

  const handleCardRemoval = (cardId) => {
    setCards((pv) => pv.filter((v) => v.id !== cardId));
    setAnimatingCard(null);
    if (onSwipeComplete) {
      onSwipeComplete();
    }
  };

  const handleSwipeStart = (cardId) => {
    setAnimatingCard(cardId);
  };

  return (
	<div className="custom-grid">
	  {cards.map((card) => {
		return (
		  <Card key={card.id} cards={cards} setCards={setCards}
			swipeDirection={swipeDirection} onSwipeComplete={onSwipeComplete} 
			animatingCard={animatingCard} onCardRemoval={handleCardRemoval}
            onSwipeStart={handleSwipeStart} {...card} />
		);
	  })}
	</div>
  );
};

const Card = ({ id, url, setCards, cards, swipeDirection, 
	onSwipeComplete, animatingCard, onCardRemoval, onSwipeStart }) => {
	const x = useMotionValue(0);

	const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
	const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

	const actualFrontCard = cards[cards.length - 1];
	const isFront = id === actualFrontCard.id && animatingCard !== actualFrontCard.id;
  	const isAnimating = id === animatingCard;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : id % 2 ? 6 : -6;

		return `${rotateRaw.get() + offset}deg`;
	});

	const handleDragEnd = () => {
		if (Math.abs(x.get()) > 100) {
			onCardRemoval(id);
		}
	};

	let animateProps = {
		scale: (isFront || isAnimating) ? 1 : 0.98,
		x: 0,
		opacity: 1
	};

	// Only apply swipe animation to the card that should be animating
	if (isAnimating) {
		if (swipeDirection === "left") {
			animateProps.x = -150;
			animateProps.opacity = 0;
		} else if (swipeDirection === "right") {
			animateProps.x = 150;
			animateProps.opacity = 0;
		}
	}

	useEffect(() => {
		if (isFront && swipeDirection && !animatingCard) {
		onSwipeStart(id);
		}
	}, [swipeDirection, isFront, animatingCard, id, onSwipeStart]);

	return (
		<motion.img
		src={url}
		alt="Placeholder alt"
		className={`card ${isFront ? "card-front" : ""}`}
		style={{
			gridRow: 1,
			gridColumn: 1,
			x,
			opacity,
			rotate,
		}}
		animate={animateProps}
		transition={{
			x: { type: "tween", ease: "easeInOut", duration: 1.2 },
			opacity: { type: "tween", ease: "easeInOut", duration: 1.2 },
			scale: { duration: 0.1 },
		}}
		onAnimationComplete={() => {
			if (isAnimating && swipeDirection) {
				onCardRemoval(id);
			}
		}}
		drag="x"
		dragConstraints={{ left: 0, right: 0 }}
		onDragEnd={handleDragEnd}
		/>
	);
};

const cardData = [
  {
	id: 1,
	url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 2,
	url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 3,
	url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 4,
	url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 5,
	url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 6,
	url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 7,
	url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
	id: 8,
	url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];