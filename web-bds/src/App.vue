<script setup lang="ts">
import { computed, ref } from "vue";

const isNoResult = ref(true);
const isInitial = ref(true);
const isLoading = ref(false);

const location = ref("");
const valuation = ref();
const streetWidth = ref("");

const validLocation = ref(" ");
const validStreetWidth = ref(" ");

const params = {
  lat: "",
  lng: "",
  width: "",
};

const error = ref([false, false]);

const styleError = computed(() => (element: any) => {
  let prototype = {
    text: "",
    field: "",
  };

  if (!element.toString()) {
    prototype.field =
      "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-100";
    prototype.text = "text-red-700";
  }

  return prototype;
});

const getValuation = async () => {
  let isValid = true;

  valuation.value = null;
  validLocation.value = location.value;
  validStreetWidth.value = streetWidth.value;

  error.value[0] = false;
  error.value[1] = false;
  valuation.value = null;

  if (!location.value) {
    error.value[0] = true;
    isValid = false;
  }

  if (!streetWidth.value.toString()) {
    error.value[1] = true;
    isValid = false;
  }

  if (isValid) {
    error.value[0] = false;
    error.value[1] = false;
  } else {
    isLoading.value = false;
    isInitial.value = true;
    return;
  }

  isLoading.value = true;
  const result = await isValidLocation(location.value);
  isInitial.value = false;

  if (result) {
    const url = "http://localhost:3000/v1/api/valuation";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data) {
        valuation.value = data;
      } else {
        isNoResult.value = true;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    isNoResult.value = true;
  }

  isLoading.value = false;
};

const isValidLocation = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURI(
    address
  )}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lng = data[0].lon;

      params.lat = lat;
      params.lng = lng;
      params.width = streetWidth.value;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

const formatVND = computed(() => (amount: string) => {
  const num = Number(amount);

  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
});
</script>

<template>
  <div v-if="isLoading" class="fixed h-full w-full bg-opacity-50 bg-gray-500">
    <div class="flex h-full w-full justify-center items-center">
      <svg
        aria-hidden="true"
        class="w-12 h-12 mr-2 text-gray-200 animate-spin fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  </div>

  <div class="py-6"></div>

  <div
    class="flex flex-col p-8 gap-4 mx-auto w-[600px] bg-green-500 rounded-t-lg"
  >
    <span
      class="text-4xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white"
      >Định giá Hẻm</span
    >
  </div>
  <div
    class="flex flex-col p-8 gap-4 mx-auto w-[600px] bg-gray-200 rounded-b-lg"
  >
    <div>
      <label
        :class="styleError(validLocation).text"
        class="block mb-2 text-sm font-medium"
        >Địa chỉ</label
      >
      <input
        type="text"
        :class="styleError(validLocation).field"
        class="border text-sm rounded-lg block w-full p-2.5 focus:!border-green-500 active:!border-green-500"
        placeholder="Địa chỉ"
        v-model="location"
      />
      <p v-if="error[0]" class="mt-2 text-sm text-red-600">
        <span class="font-medium">Vui lòng nhập địa chỉ !</span>
      </p>
    </div>

    <div>
      <label
        :class="styleError(validStreetWidth).text"
        class="block mb-2 text-sm font-medium"
        >Độ rộng hẻm</label
      >
      <input
        type="number"
        min="0"
        :class="styleError(validStreetWidth).field"
        class="border text-sm rounded-lg block w-full p-2.5 focus:!border-green-500 active:!border-green-500"
        placeholder="Độ rộng hẻm"
        v-model="streetWidth"
      />
      <p v-if="error[1]" class="mt-2 text-sm text-red-600">
        <span class="font-medium">Vui lòng nhập độ rộng hẻm !</span>
      </p>
    </div>

    <div class="flex justify-end">
      <button
        @click="getValuation"
        type="button"
        class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Định giá
      </button>
    </div>

    <div v-if="!isInitial && !isLoading">
      <div
        v-if="valuation && Number(valuation) > 0"
        class="flex justify-center items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      >
        <svg
          class="flex-shrink-0 w-3.5 h-3.5 text-green-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span class="leading-tight text-sm font-medium ml-2"
          >Định giá : {{ formatVND(valuation) }}</span
        >
      </div>

      <label v-else class="text-center block mb-2 text-sm font-medium"
        >Không có kết quả cho tìm kiếm này
      </label>
    </div>
  </div>
</template>
