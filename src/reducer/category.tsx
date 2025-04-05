import { categoryType } from "../types/category";

export type categoryActionReducer = {
    type: "add-all" | "delete",
    payload?: {
        categories?: categoryType[],
        id_category_news?: number,
    }
}

export function categoryReducer(state: categoryType[], action: categoryActionReducer): categoryType[] {
    switch (action.type) {
        case "add-all":
            return action.payload?.categories ? action.payload.categories : state
        case "delete":
            return state.filter(s => s.id_category_news !== action.payload?.id_category_news)
        default:
            return state;
    }
}