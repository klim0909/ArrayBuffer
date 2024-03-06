const ArrayBufferConverter = require('../src/arrayBufferConverter');

describe("ArrayBufferConverter", () => {
  it("должен правильно загружать буфер", () => {
    const converter = new ArrayBufferConverter();
    const buffer = getBuffer();
    converter.load(buffer);
    expect(converter.buffer).toEqual(buffer);
  });

  it("должен выбрасывать ошибку, если буфер не загружен", () => {
    const converter = new ArrayBufferConverter();
    expect(() => converter.toString()).toThrowError("Буфер не загружен");
  });

  it("должен правильно преобразовывать загруженный буфер в строку", () => {
    const converter = new ArrayBufferConverter();
    const buffer = getBuffer();
    converter.load(buffer);
    const expectedString = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
    expect(converter.toString()).toBe(expectedString);
  });
});

function getBuffer() {
  const data = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  return (input => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i++) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
}
