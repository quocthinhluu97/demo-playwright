import { DateTime } from "luxon";

export class TimeUtils {
    public static now(): DateTime {
        return DateTime.now();
    }
}