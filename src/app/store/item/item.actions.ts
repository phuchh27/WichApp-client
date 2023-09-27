import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/item.model";

export const addItemStart = createAction(
    '[Item] Add Item Start',
    props<{ item: Item, storeId: string | null }>()
)

export const addItemSuccess = createAction(
    '[Item] Add Item Success',
    props<{ item: Item }>()
)

export const addItemFailure = createAction(
    ' [Item] Add Item Failure',
    props<{ error: any }>()
)

export const getItemsStart = createAction(
    ' [Item] Get Items Start',
    props<{ storeId: string | null }>()
)

export const getItemsSuccess = createAction(
    ' [Item] Get Items Success',
    props<{ items: Item[] }>()
)

export const getItemsFailure = createAction(
    ' [Item] Get Items Failure',
    props<{ error: any }>()
)

export const updateItemStart = createAction(
    '[Item] Update Item Start',
    props<{ item: Item, storeId: string | null, id: number }>()
)

export const updateItemSuccess = createAction(
    '[Item] Update Item Success',
    props<{ item: Item }>()
)

export const updateItemFailure = createAction(
    ' [Item] Update Item Failure',
    props<{ error: any }>()
)

export const deleteItemStart = createAction(
    '[Item] Delete Item Start',
    props<{ id: number, storeId: string | null }>()
)

export const deleteItemSuccess = createAction(
    ' [Item] Delete Item Success',
    props<{ id: number }>()
)

export const deleteItemFailure = createAction(
    ' [Item] Delete Item Failure',
    props<{ error: any }>()
)
    








