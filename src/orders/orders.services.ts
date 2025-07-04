import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TOrderSelect,TOrderInsert,ordersTable } from "../drizzle/schema";
 
 
//CRUD Operations for Orders entity
 
 
//Get all Orders
export const getExistingOrders = async (): Promise<TOrderSelect[] | null> => {
  return await db.query.ordersTable.findMany({
    with: {
      user: {
        with: {
          addresses: {
            with: {
              city: {
                with: {
                  state: true,
                },
              },
            },
          },
        },
      },
      driver: {
        columns: {
          carMake: true,
          carModel: true,
        },
        with:{
          user:{
            columns:{userName:true}
          }
        }
      },
      restaurant:{
        columns:{
          restaurantName:true, streetAddress:true
        },
        with:{
          city:{
            columns:{
              cityName:true
            }
          }
        }
      }
    },
  });
};

 
//Get order by ID
export const getExistingOrderById = async(existingOrderId: number):Promise<TOrderSelect | undefined>=> {
      return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.ordersId,existingOrderId)
      })
}
 
// Create a New Order
export const createNewOrder = async(order:TOrderInsert):Promise<string> => {
       await db.insert(ordersTable).values({
        restaurantId:order.restaurantId,
        estimatedDeliveryTime:order.estimatedDeliveryTime,
        actualDeliveryTime:order.actualDeliveryTime,
        deliveryAddressId:order.deliveryAddressId,
        userId:order.userId,
        driverId:order.driverId,
        price: order.price?.toString(),       // <-- make sure it's string
        discount: order.discount?.toString() || "0.00", // <-- default fallback
        finalPrice: order.finalPrice.toString(), // <-- string
    comment: order.comment,
       }).returning();
        return "Order Created Successfully 😎"
}
 
// Update an existing Order
export const updateExistingOrder = async(existingOrderId: number, order:TOrderInsert):Promise<string> => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.ordersId,existingOrderId));
    return "Address Details  Updated Succeffully 😎";
}

 //delete an existing Order
export const deleteExistingOrder = async(existingOrderId: number):Promise<string> => {
   await db.delete(ordersTable).where(eq(ordersTable.ordersId,existingOrderId));
   return "Selected Order Deleted Sucessfully";
}