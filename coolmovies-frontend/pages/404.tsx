import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6 dark:bg-primary dark:text-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold light:text-gray-800 dark:text-white mt-6">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mt-4 dark:text-white">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 dark:bg-white dark:text-gray-800 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Custom404;
