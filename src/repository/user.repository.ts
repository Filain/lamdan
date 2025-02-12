export class UserRepository {
    // async post(userId: string, orderId: Types.ObjectId): Promise<IUser | null> {
    //     return await userModel
    //         .findByIdAndUpdate(
    //             userId,
    //             { $push: { orders: orderId } },
    //             { new: true },
    //         )
    //         .exec();
    // }
}

export const userRepository = new UserRepository();
