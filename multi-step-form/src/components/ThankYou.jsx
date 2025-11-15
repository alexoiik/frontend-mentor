// Importing Image.
import thankYouIcon from "../assets/images/icon-thank-you.svg";

const ThankYou = () => {
    return (
        <div className="flex flex-col items-center text-center mt-20 px-10">
            <img src={thankYouIcon} alt="Thank You" className="w-20 h-20 mb-6" />

            <h1 className="text-2xl font-bold mb-2">Thank you!</h1>

            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                Thanks for confirming your subscription!
                We hope you  have fun using our platform.
                If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    );
};

export default ThankYou;
