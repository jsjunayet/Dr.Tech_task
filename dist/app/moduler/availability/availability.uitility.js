"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTimeSlotsOverlap = exports.convertTo24Hour = void 0;
const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number); // ✅ fix
    if (modifier === "PM" && hours < 12)
        hours += 12;
    if (modifier === "AM" && hours === 12)
        hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
exports.convertTo24Hour = convertTo24Hour;
const doTimeSlotsOverlap = (slot1, slot2) => {
    const [start1, end1] = slot1
        .split(" - ")
        .map((t) => new Date(`1970-01-01T${(0, exports.convertTo24Hour)(t)}:00`));
    const [start2, end2] = slot2
        .split(" - ")
        .map((t) => new Date(`1970-01-01T${(0, exports.convertTo24Hour)(t)}:00`));
    return start1 < end2 && start2 < end1;
};
exports.doTimeSlotsOverlap = doTimeSlotsOverlap;
