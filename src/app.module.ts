import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReviewModule } from './review/review.module';
import { ShippingModule } from './shipping/shipping.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationModule } from './notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'northbynorth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AdminModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    InventoryModule,
    ReviewModule,
    ShippingModule,
    CartModule,
    WishlistModule,
    NotificationModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
