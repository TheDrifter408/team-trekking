import { ChangeEvent, FC } from "react";

export const DatePicker:FC<{ date: Date, onDateChange: (e:ChangeEvent<HTMLInputElement>) => void }> = ({ 
    date, 
    onDateChange 
}) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="date"
                id="date-picker"
                value={date.toISOString().split('T')[0]}
                className="border border-gray-200 rounded-md px-2 py-1"
                onChange={onDateChange}
            />
        </div>
    );
}