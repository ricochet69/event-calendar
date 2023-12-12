import "./DatePickerModal.css";
import { useRef, useEffect } from "react";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatePickerModal = ({ isOpen, onClose }: DatePickerModalProps) => {
  const yearContainerRef = useRef<HTMLDivElement | null>(null);
  const monthContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleYearWheel = (e: WheelEvent) => {
      if (yearContainerRef.current) {
        yearContainerRef.current.scrollTop += e.deltaY * 0.5;
        e.preventDefault(); // This line prevents the default scroll behavior
      }
    };

    const handleMonthWheel = (e: WheelEvent) => {
      if (monthContainerRef.current) {
        monthContainerRef.current.scrollTop += e.deltaY * 0.5;
        e.preventDefault(); // This line prevents the default scroll behavior
      }
    };

    const yearContainer = yearContainerRef.current;
    const monthContainer = monthContainerRef.current;

    if (yearContainer && monthContainer) {
      yearContainer.addEventListener("wheel", handleYearWheel, { passive: false });
      monthContainer.addEventListener("wheel", handleMonthWheel, { passive: false });
      return () => {
        yearContainer.removeEventListener("wheel", handleYearWheel);
        monthContainer.removeEventListener("wheel", handleMonthWheel);
      };
    }
  }, []);

  // Close Modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const yearArray = [];
  for (let i = 2000; i <= 2050; i++) {
    yearArray.push(i);
  }
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
            {yearArray.map((year) => (
              <button className="item" key={year}>
                {year}
              </button>
            ))}
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
