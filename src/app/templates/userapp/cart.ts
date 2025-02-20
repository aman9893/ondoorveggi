import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()
export class CartProvider {

	private CARTS_KEYWORD: string = "carts";


	constructor(private storage: Storage) { }


	public async get(): Promise<any[]> {

		let carts: any[] = await this.storage.get(this.CARTS_KEYWORD);

		carts = await this.validateCarts(carts);

		return carts;
	}

	public async getByStoreBid(storeBid: number): Promise<any> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);

		const cart: any = await this.validateCart(carts, storeBid);

		return cart;
	}


	public async addCartItem(storeBid: number, cartItem: any): Promise<void> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cartItem.identifier = this.generateIdentifier();

		cart.cartItems.push(cartItem);

		await this.addOrUpdateCart(carts, cart);
	}

	public async clearCartItem(storeBid: number): Promise<void> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cart.cartItems = new Array<any>();

		await this.addOrUpdateCart(carts, cart);
	}

	public async removeCartItem(storeBid: number, cartItem: any): Promise<any> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cart.cartItems = cart.cartItems.filter((a: any) => a.identifier !== cartItem.identifier);

		return await this.addOrUpdateCart(carts, cart);
	}


	public async addCartItemOffer(storeBid: number, cartItemOffer: any): Promise<void> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cartItemOffer.identifier = this.generateIdentifier();

		cart.cartItemOffers.push(cartItemOffer);

		await this.addOrUpdateCart(carts, cart);
	}

	public async clearCartItemOffer(storeBid: number): Promise<void> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cart.cartItemOffers = new Array<any>();

		await this.addOrUpdateCart(carts, cart);
	}

	public async removeCartItemOffer(storeBid: number, cartItemOffer: any): Promise<any> {

		const carts: any[] = await this.storage.get(this.CARTS_KEYWORD);
		const cart: any = await this.validateCart(carts, storeBid);

		cart.cartItemOffers = cart.cartItemOffers.filter((a: any) => a.identifier !== cartItemOffer.identifier);

		return await this.addOrUpdateCart(carts, cart);
	}


	public async clearCarts(): Promise<void> {

		const carts: any[] = new Array<any>();

		await this.storage.set(this.CARTS_KEYWORD, carts);
	}


	private async validateCarts(carts: any[]): Promise<any[]> {

		if (!carts) {
			console.log("Carts from storage was undefined or null. It is created now.");
			carts = new Array<any>();
			await this.storage.set(this.CARTS_KEYWORD, carts);
		}

		return carts;
	}

	private async validateCart(carts: any[], storeBid: number): Promise<any> {

		carts = await this.validateCarts(carts);

		let cart: any = carts.find(a => a.storeBid === storeBid);

		if (!cart) {
			console.log("No cart for this store. It is created now.");

			cart = new any({
				storeBid,
				cartItems: new Array<any>(),
				cartItemOffers: new Array<any>(),
			});
			console.log(cart);
			carts.push(cart);
			await this.storage.set(this.CARTS_KEYWORD, carts);
		}

		return cart;
	}


	private async addOrUpdateCart(carts: any[], cart: any): Promise<any> {
		carts = carts.filter((a: any) => a.storeBid !== cart.storeBid);
		carts.push(cart);

		await this.storage.set(this.CARTS_KEYWORD, carts);

		return cart;
	}


	private generateIdentifier(): number {
		return Math.floor((Math.random() * 1000) + 1);
	}
}
