//----------------------------
//          Task 1
//----------------------------

const nums = "143163421154143";
const predefinedNumbers = ["21154", "143", "21154143", "1634", "163421154"];

function createNestedArrayOfMatches(nums: string, predefinedNumbers: string[]) {
  // If no input exit early
  if (nums.length === 0) {
    return [[]];
  }

  return predefinedNumbers
    .filter((numberInArray) => nums.startsWith(numberInArray))
    .flatMap((item) =>
      createNestedArrayOfMatches(
        nums.slice(item.length),
        predefinedNumbers
      ).map((itemFromFlatMap) => [item, ...itemFromFlatMap])
    );
}

function makeNumSentences(nums: string, predefinedNumbers: string[]) {
  return createNestedArrayOfMatches(nums, predefinedNumbers).map(
    (itemInArrayToJoin) => `:${itemInArrayToJoin.join(":")}:`
  );
}

//----------------------------
//          Task 2
//----------------------------

// Find and print in console the city located at latitude/longtitude 51.5074 and 0.1278 accordingly
Provider.findCity(51.5074, 0.1278).then((result: string) =>
  console.log(result)
);

// Print in console the weather for the city located at lat/long = 51.5074 and 0.1278
Provider.findCity(51.5074, 0.1278).then((city: string) => {
  Provider.getWeather(city).then((result: string) => console.log(result));
});

//Print in console in one line the weather and currency for a given city (London)
Promise.all([
  Provider.getWeather("London"),
  Provider.getLocalCurrency("London"),
]).then((result: String[]) => {
  const [weather, currency] = result;
  console.log(`${weather}, ${currency}`);
});

//----------------------------
//          Task 4
//----------------------------

const TWO_SECONDS_IN_MS = 2000;

type StateResponse = "processing" | "error" | "success";
type ErrorResponse = "NO_STOCK" | "INCORRECT_DETAILS";

interface ArrayItem {
  state: StateResponse;
  errorCode?: ErrorResponse | null | undefined;
}

interface ReturnValue {
  title: string;
  message: string | null;
}

const processError = (item: ArrayItem) => {
  const { errorCode } = item;

  switch (errorCode) {
    case null || undefined:
      return { title: "Error page", message: null };
      break;
    case "NO_STOCK":
      return {
        title: "Error page",
        message: "No Stock has been found",
      };
      break;
    case "INCORRECT_DETAILS":
      return {
        title: "Error page",
        message: "Incorrect details have been entered",
      };
      break;
  }
};

const processSuccess = () => {
  return { title: "Order Complete", message: "null" };
};

function getProcessingPage(data: ArrayItem[]) {
  let shouldSkip: boolean = false;

  let result;

  data.forEach((item) => {
    if (shouldSkip) {
      return;
    }

    switch (item.state) {
      case "processing":
        setTimeout(() => {
          return;
        }, TWO_SECONDS_IN_MS);
        break;
      case "error":
        shouldSkip = true;
        result = processError(item);
        break;
      case "success":
        shouldSkip = true;
        result = processSuccess();
        break;
    }
  });

  return result;
}

const result = getProcessingPage([{ state: "processing" }, { state: "error" }]);
