<template>
  <div
    class="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md z-10"
  >
    <div class="md:max-w-md w-full px-4 py-4 bg-gray-50 ml-auto">
      <form>
        <div class="mb-12">
          <h3 class="text-gray-800 text-3xl font-extrabold">Sign in</h3>
          <p class="text-sm mt-4 text-gray-800">
            Don't have an account
            <a
              href="javascript:void(0);"
              @click="switchToSignUp"
              class="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >Register here</a
            >
          </p>
        </div>

        <div>
          <label class="text-gray-800 text-xs block mb-2">Email</label>
          <div class="relative flex items-center">
            <input
              v-model="email"
              name="email"
              type="text"
              required
              class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
              placeholder="Enter email"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              class="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g
                clip-path="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  fill="none"
                  stroke-miterlimit="10"
                  stroke-width="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <div class="mt-8">
          <label class="text-gray-800 text-xs block mb-2">Password</label>
          <div class="relative flex items-center">
            <input
              v-model="password"
              name="password"
              type="password"
              required
              class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
              placeholder="Enter password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              class="w-[18px] h-[18px] absolute right-2 cursor-pointer"
              viewBox="0 0 128 128"
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
          <!-- Other buttons/links can go here -->
        </div>

        <div class="mt-12">
          <button
            @click="login()"
            type="button"
            class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#A93428] hover:bg-gray-700 focus:outline-none"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import authService from "../../auth/auth.js";
export default {
  data() {
    return {
      base_URL:'',
      email: "",
      password: "",
    };
  },

  mounted() {
    this.base_URL = import.meta.env.VITE_LOCAL_API
  },

  methods: {
    switchToSignUp() {
      // Emit an event to the parent component to switch to Sign Up form
      this.$emit("switchToSignUp");
    },

    async login() {
      try {
        // Send POST request with email and password
        const response = await axios.post(
          `${this.base_URL}/api/v1/user/login`,
          {
            email: this.email,
            password: this.password,
          }
        );

        console.log("Login successful:", response.data);
        if (response.data.status == "Authorized") {
          authService.saveToken(response.data.token);
          authService.saveUserId(response.data.user_id);
          console.log("Login", response.data.user_id);
          authService.saveUserName(response.data.name);
          Swal.fire({
            title: response.data.status,
            text: "Redirecting...",
            icon: "success",
            confirmButtonColor: "#A93428",
            confirmButtonText: "Okay",
          }).then(() => {
            this.$router.push("/homepage");
          })
          
          
        }
        else{
          Swal.fire({
            title: response.data.status,
            text: response.data.error,
            icon: "error",
            confirmButtonColor: "#A93428",
            confirmButtonText: "Okay",
          })
        }
      } catch (error) {
        // Handle error
        console.error(
          "Login failed:",
          error.response ? error.response.data : error.message
        );
        alert("Login failed! Please check your credentials.");
      }
    },
  },
};
</script>
