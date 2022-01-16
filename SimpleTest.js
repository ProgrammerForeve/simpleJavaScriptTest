/**
 * Класс простого теста функции
 * @author Boew Grigory (ff.nspu@gmail.com)
 */
class SimpleTest{
  /**
   * Конструктор простого теста функции
   *
   * @author Boew Grigory (ff.nspu@gmail.com)
   * @param {object} paramObj Объект-параметр
   * @param {string} paramObj.name Имя теста
   * @param {function} paramObj.func Функция для тестирования
   * @param {Array} paramObj.testData Параметры тестов. Массив объектов вида {params:[1,3,3], result: "A"}
  */
  constructor({name, func, testData}){
    this.name = name;
    this.func = func;
    this.testData = testData;
  };

  /**
   * Запускает тест
   *
   * @author Boew Grigory (ff.nspu@gmail.com)
  */
  run(){
    let stat = {
      success:{count:0, log:""},
      falied:{count:0, log:""},
    };
    this.testData.forEach((test,testNumber)=>{
      let result;
      let isSuccess;
      let errorMessage;
      try{
        result = this.func(...test.params);
        isSuccess = result===test.result;
      }catch(err){
        errorMessage = err.messsage;
        isSuccess = false;
      };      
      
      if(isSuccess){
        stat.success.count++;
        stat.success.log+=`test ${1+testNumber}: ${this.name}(${test.params}) OK, got: ${result}\n`;
      }else{
        stat.falied.count++;
        stat.falied.log+=`test ${1+testNumber}: ${this.name}(${test.params}) Falied, expected: ${test.result} , got: ${result}${errorMessage!==undefined?"; Error: "+errorMessage:""}\n`;
      }; 
    });  
    
    let logger = (Logger && Logger.log)?Logger.log:console.log; // default for Google Script or JS console
    
    logger(`${stat.success.count} tests OK`);
    logger(stat.success.log);
    logger(`${stat.falied.count} tests FALIED`);
    logger(stat.falied.log);
    logger(`Test ${!stat.falied.count?"OK":"Falied"}`); 
  };
};

// usage:
(function test_col2A1(){  
  let func = col2A1;
  let name = "col2A1";
  let testData = [
    {params:[1], result: "A"},
    {params:[2], result: "B"},
    {params:[25], result: "Y"},
    {params:[26], result: "Z"},
    {params:[27], result: "AA"},
    {params:[28], result: "AB"},
    {params:[100], result: "CV"},
  ];

  let simpleTest = new SimpleTest({name:name, func: func, testData: testData});
  simpleTest.run();   
});
/*
  7 tests OK
  test 1: col2A1(1) OK, got: A
  test 2: col2A1(2) OK, got: B
  test 3: col2A1(25) OK, got: Y
  test 4: col2A1(26) OK, got: Z
  test 5: col2A1(27) OK, got: AA
  test 6: col2A1(28) OK, got: AB
  test 7: col2A1(100) OK, got: CV
  0 tests FALIED

  Test OK
*/
