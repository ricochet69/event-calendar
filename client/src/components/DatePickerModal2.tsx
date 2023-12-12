import "./DatePickerModal2.css";
import { useState, useRef, useEffect } from "react";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatePickerModal = ({ isOpen, onClose }: DatePickerModalProps) => {
  const yearContainerRef = useRef<HTMLDivElement | null>(null);
  const monthContainerRef = useRef<HTMLDivElement | null>(null);

  const [scrollValue1, setScrollValue1] = useState(2023);
  const [scrollValue2, setScrollValue2] = useState(0);

  useEffect(() => {
    const handleYearWheel = (e: WheelEvent) => {
      if (yearContainerRef.current) {
        const delta = e.deltaY;

        if (delta > 0) {
          setScrollValue1(scrollValue1 + 1);
        } else if (delta < 0) {
          setScrollValue1(scrollValue1 - 1);
        }
      }
    };

    const yearContainer = yearContainerRef.current;
    // const monthContainer = monthContainerRef.current;

    if (yearContainer) {
      yearContainer.addEventListener("wheel", handleYearWheel, { passive: false });
      // monthContainer.addEventListener("wheel", handleMonthWheel, { passive: false });
      return () => {
        yearContainer.removeEventListener("wheel", handleYearWheel);
        // monthContainer.removeEventListener("wheel", handleMonthWheel);
      };
    }
  }, [scrollValue1]);

  // Close Modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const monthArray = [];
  for (let i = 0; i <= 11; i++) {
    const date = new Date(2000, i, 1);
    monthArray.push(date.toLocaleString("en-GB", { month: "long" }));
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="model-header">
          <h2 className="title">Year</h2>
          <h2 className="title">Month</h2>
        </div>
        <div className="scrollContainer">
          <div className="scrollColumn" ref={yearContainerRef}>
            <button className="item">{scrollValue1}</button>
          </div>

          {/* Right side for months */}
          <div className="scrollColumn" ref={monthContainerRef}>
            {monthArray.map((month) => (
              <button className="item" key={month}>
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
