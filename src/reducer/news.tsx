import { newsType } from "../types/news";

export type newsActionReducer = {
    type: "add-all" | "delete",
    payload?: {
        news?: newsType[],
        id_news?: number,
    }
}

export function newsReducer(state: newsType[], action: newsActionReducer): newsType[] {
    switch (action.type) {
        case "add-all":
            return action.payload?.news ? action.payload.news : state
        case "delete":
            return state.filter(s => s.id_news !== action.payload?.id_news)
        default:
            return state;
    }
}