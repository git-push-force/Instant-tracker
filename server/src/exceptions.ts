import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalError extends HttpException {
	constructor() {
		super('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

export class InvalidProperty extends HttpException {
	constructor(property) {
		super(`Provide valid ${property}`, HttpStatus.BAD_REQUEST);
	}
}

export class WrongPassword extends HttpException {
	constructor() {
		super('Wrong password', HttpStatus.BAD_REQUEST);
	}
}

export class NeedPassword extends HttpException {
	constructor() {
		super(
			'Provide password to get access to this calendar',
			HttpStatus.UNAUTHORIZED
		);
	}
}

export class AlreadyExist extends HttpException {
	constructor(item, property) {
		super(
			`${item} with this ${property} already exists`,
			HttpStatus.BAD_REQUEST
		);
	}
}

export class NotExist extends HttpException {
	constructor(item, property) {
		super(
			`${item} with this ${property} doesn\'t exists`,
			HttpStatus.NOT_FOUND
		);
	}
}
