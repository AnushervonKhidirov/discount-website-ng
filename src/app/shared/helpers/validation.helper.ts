export function removeFalsy<T>(data: { [key: string]: unknown }): T {
  const filteredData = { ...data };
  for (const key in filteredData) {
    if (!filteredData[key]) delete filteredData[key];
  }

  return filteredData as T;
}
