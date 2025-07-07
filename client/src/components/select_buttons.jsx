import './select_buttons.css';

export default function SelectButtons({ onSwipe }) {
    return (
        <div className="select_buttons-sections">
            <button className='save-button' onClick={() => onSwipe("down")}><div className="save"></div></button>
            <button className='no-button' onClick={() => onSwipe("left")}><div className="no"></div></button>
            <button className='maybe-button' onClick={() => onSwipe("right")}><div className="maybe"></div></button>
            <button className='yes-button' onClick={() => onSwipe("up")}><div className="yes"></div></button>
        </div>
    );
};