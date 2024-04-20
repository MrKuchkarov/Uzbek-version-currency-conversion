import {encoded, translations} from './data.js'
function decodeFields(encoded, translations) {
    // Создаю новый массив, в который будем помещать расшифрованные объекты
    return encoded.map(obj => {
        // Для каждого объекта из списка encoded выполню следующие действия

        // Использую метод map для итерации по всем элементам массива encoded
        // Возвращаю новый массив, который будет содержать расшифрованные объекты

        // Для каждого объекта создаю новый объект, который будет содержать расшифрованные значения
        return Object.keys(obj).reduce((decodedObj, key) => {
            // Метод reduce для итерации по всем ключам объекта obj
            // И возвращаю новый объект, в который добавляю расшифрованные значения

            // Проверяю, если ключ заканчивается на "Id" и не является одним из исключенных полей
            if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
                // Получаю значение поля с текущим ключом
                const id = obj[key];
                // Проверяю, есть ли в словаре translations соответствующий перевод для этого значения
                const translation = translations[id];
                // Если есть, заменяю значение в новом объекте на переведенное значение, иначе оставляю исходное
                decodedObj[key] = translation !== undefined ? translation : id;
            } else {
                // Если ключ не заканчивается на "Id" или является одним из исключенных полей,
                // то просто копирую значение из исходного объекта в новый объект
                decodedObj[key] = obj[key];
            }
            // Возвращаю объект с расшифрованными значениями или копиями исходных значений
            return decodedObj;
        }, {}); // Начальное значение для метода reduce - пустой объект
    });
}

const decoded = decodeFields(encoded, translations);
console.log(decoded);

// Список уникальных id
const uniqueIds = [...new Set(encoded.flatMap(obj => Object.values(obj).filter(value => typeof value === 'string' && value.endsWith('Id'))))];
console.log(uniqueIds);


console.log("Let's rock")
console.log(encoded, translations)



// console.log(decoded)
