export const emailValidatorRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const nameLastnameRegex = /^[a-zÀ-ú0-9\-’'\s]+$/i;

export const onlyNumbersRegex = /^[0-9]+$/;
export const onlyLettersRegex = /^[a-zA-Z\s]+$/;
export const onlyLettersSpecialRegex = /^[\p{L}\p{M}\s'-]+$/u;

export const onlyLetters = (text: string): string => text.trim().replace(/[^a-zA-Z\s]/g, '');

export const formatedCreditCardNumber = (string: string): string => string
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

export const formatedCardLabel = (card: string, type: string): string => {
    let cardFormated = card.replace(/\*/gi, '');
    cardFormated = `${type} ${cardFormated}`;
    return cardFormated;
};

export const isPhoneNumberRegEx = /^\+?[1-9]\d{9,12}$|^(\d{3}[-.\s]?){2}\d{4}$|^\(\d{3}\)\s?\d{3}[-.\s]?\d{4}$/;

export const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneNumberOrEmailRegEx = /^(?:\d{10,13}|(?=[a-zA-Z0-9])[a-zA-Z0-9]+(?:[._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,3})$/

export const removeBlankSpaces = (text: string) => text.replace(/\s/g, '');

export const removeSpecialCharacters = (text: string): string => text.replace(/[^a-zA-Z0-9]/g, '');

export const toCamelCase = (text: string): string => text
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr) => chr ? chr.toUpperCase() : '')
    .replace(/^[A-Z]/, chr => chr.toLowerCase());
