import { createAction, props } from "@ngrx/store"
import { ICategory } from "src/app/models/category.model"

export const getICategoryStart = createAction(
    ' [Item] Get ICategory Start',
    props<{ storeId: string | null }>()
)

export const getICategorySuccess = createAction(
    ' [Item] Get ICategory Success',
    props<{ icategories: ICategory[] }>()
)

export const getICategoryFailure = createAction(
    ' [Item] Get ICategory Failure',
    props<{ error: any }>()
)

export const addICategoryStart = createAction(
    ' [Item] Add ICategory Start',
    props<{ icategory: ICategory, storeId: string | null }>()
)

export const addICategorySuccess = createAction(
    ' [Item] Add ICategory Success',
    props<{ icategory: ICategory[] }>()
)

export const addICategoryFailure = createAction(
    ' [Item] Add ICategory Failure',
    props<{ error: any }>()
)