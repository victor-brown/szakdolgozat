export const ASCII_DECODER_FUNCTION_NAME = "decodeAsciiArray";
export const ASCII_DECODER_FUNCTION = `function ${ASCII_DECODER_FUNCTION_NAME} (asciiArray){
  let result = "";

  for (let index = 0; index < asciiArray.length; index++) {
    const element = asciiArray[index];
    result += String.fromCharCode(element);
  }

  return result;
};`;

export const FRACTIAL_NUMBER_PARSER_FUNCTION_NAME = "parseFractial";
export const FRACTIAL_NUMBER_PARSER_FUNCTION = `function ${FRACTIAL_NUMBER_PARSER_FUNCTION_NAME}(number){
  const [integerPart, fractionalPart] = number.split('.');

  const integerValue = parseInt(integerPart, 16);
  let fractionalValue = 0;
  if (fractionalPart) {
      const fractionalHex = '0.' + fractionalPart;
      fractionalValue = parseInt(fractionalHex, 16);
  }

  return integerValue + fractionalValue;

}`;

const TRUE_BOOLEAN_EXPRESSIONS = [
  "undefined == null",
  "undefined != typeof any",
  "typeof any == typeof any",
  "null == null",
];
const FALSE_BOOLEAN_EXPRESSIONS = [
  "[] == [[]]",
  "[] == [[]]",
  "undefined === null",
  "[] === undefined",
];

export const getTrueExpression = (): string => {
  return TRUE_BOOLEAN_EXPRESSIONS[
    Math.floor(Math.random() * TRUE_BOOLEAN_EXPRESSIONS.length)
  ];
};
export const getFalseExpression = (): string => {
  return FALSE_BOOLEAN_EXPRESSIONS[
    Math.floor(Math.random() * FALSE_BOOLEAN_EXPRESSIONS.length)
  ];
};
