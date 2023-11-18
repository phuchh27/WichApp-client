import { createAction, props } from "@ngrx/store";
import { ICategory } from "src/app/models/category.model";
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
    props<{ item: Item}>()
)

export const updateItemSuccess = createAction(
    '[Item] Update Item Success',
    // props<{ item: Item }>()
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

export const getItemsByCategoryStart = createAction(
    ' [Item] Get Items By Category Start',
    props<{ storeId: string | null, cate_id:any }>()
)

export const getItemsByCategorySuccess = createAction(
    ' [Item] Get Items By Category Success',
    props<{ items: Item[] }>()
)

export const getItemsByCategoryFailure = createAction(
    ' [Item] Get Items By Category Failure',
    props<{ error: any }>()
)


export const addItemsCategoryStart = createAction(
    ' [Item] Add Items Category Start',
    props<{ storeId: string | null, category:any }>()
)

export const addItemsCategorySuccess = createAction(
    ' [Item] Add Items Category Success',
)

export const addItemsCategoryFailure = createAction(
    ' [Item] Add Items Category Failure',
    props<{ error: any }>()
)

//For staff
export const getItemsForStaffStart = createAction(
    ' [Item] Get Items For Staff Start',
    props<{ storeId: string | null }>()
)

export const getItemsForStaffSuccess = createAction(
    ' [Item] Get Items For Staff Success',
    props<{ items: Item[] }>()
)

export const getItemsForStaffFailure = createAction(
    ' [Item] Get Items For Staff Failure',
    props<{ error: any }>()
)










    








