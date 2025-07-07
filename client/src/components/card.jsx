import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import cardData from '../data/cardData';
import './card.css';

export default function Cards({ swipeDirection, onSwipeComplete }) {
  const [cards, setCards] = useState(cardData);
  const [animatingCard, setAnimatingCard] = useState(null);

  const handleCardRemoval = (cardId, direction) => {
	fetch("/your/api/endpoint", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ cardId, direction }),
     })
     .then(r => r.json())
     .then(console.log)
     .catch(console.error);

    setCards((pv) => pv.filter((v) => v.id !== cardId));
    setAnimatingCard(null);
    if (onSwipeComplete) {
      onSwipeComplete(cardId, direction);
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
	const rotateX = useTransform(x, [-150, 150], [-15, 15]);
	const opacityX = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

	const y = useMotionValue(0);
	const rotateY = useTransform(y, [-150, 150], [-15, 15]);
	const opacityY = useTransform(y, [-200, 0, 200], [0.5, 1, 0.5]);

	const opacity  = useTransform(
		[opacityX, opacityY],
		([oX, oY]) => Math.min(oX, oY)
	);

	const actualFrontCard = cards[cards.length - 1];
	const isFront = id === actualFrontCard.id;
  	const isAnimating = id === animatingCard;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : id % 2 ? 1 : -1;

		return `${rotateX.get() + offset}deg`;
	});

	const handleDragEnd = () => {
		if (Math.abs(x.get()) > 100 || Math.abs(y.get()) > 100) {
			// decide primary direction
			let direction;
			if (Math.abs(x.get()) > Math.abs(y.get())) {
				direction = x.get() > 0 ? "right" : "left";
			} else {
				direction = y.get() > 0 ? "down"  : "up";
			}
			onCardRemoval(id, direction);
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
		} else if (swipeDirection === "up") {
			animateProps.y = -150;
			animateProps.opacity = 0;
		} else if (swipeDirection === "down") {
			animateProps.y = 150;
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
			zIndex: isAnimating ? cards.length : id,
			gridRow: 1,
			gridColumn: 1,
			x,
			y,
			opacity,
			rotateX,
			rotateY,
			rotate,
		}}
		animate={animateProps}
		transition={{
			opacity: { type: "tween", ease: "easeInOut", duration: 1.2 },
			scale: { duration: 0.1 },
		}}
		onAnimationComplete={() => {
			if (isAnimating && swipeDirection) {
				onCardRemoval(id, swipeDirection);
			}
		}}
		drag
		dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
		onDragEnd={handleDragEnd}
		/>
	);
};
