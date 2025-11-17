import { useRef, useState } from "react";
import iconUpload from "../assets/images/icon-upload.svg";
import iconInfo from "../assets/images/icon-info.svg";

const Form = ({ onGenerate }) => {
    const fileInputRef = useRef();
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        github: "",
    });

    // ---------- Handle Drag & Drop ----------
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        validateFile(file);
    };

    // ---------- File Validation ----------
    const validateFile = (file) => {
        if (!file) return;

        if (file.size > 500 * 1024) {
            setErrors((prev) => ({
                ...prev,
                avatar: "File too large. Please upload a photo under 500KB.",
            }));
            return;
        }

        setAvatar(file);
        setErrors((prev) => ({ ...prev, avatar: null }));
    };

    // ---------- Validating all fields ----------
    const validateForm = () => {
        let newErrors = {};

        if (!avatar) newErrors.avatar = "Please upload an avatar.";
        if (!form.fullName.trim()) newErrors.fullName = "This field is required.";
        if (!form.github.trim()) newErrors.github = "This field is required.";
        if (!form.email.trim()) newErrors.email = "This field is required.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
            newErrors.email = "Please enter a valid email address.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ---------- Handling Submit ----------
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const reader = new FileReader();
        reader.onload = () => {
            onGenerate({
                avatar: reader.result,
                fullName: form.fullName,
                email: form.email,
                github: form.github,
            });
        };
        reader.readAsDataURL(avatar);
    };

    return (
        <>
            <h1 className="text-white font-extrabold text-3xl md:text-5xl max-w-[700px]">
                Your Journey to Coding Conf 2025 Starts Here
            </h1>

            <p className="text-white/80 mt-4 text-lg md:text-xl max-w-[700px]">
                Secure your spot at next year's biggest coding conference.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 md:p-8 text-left text-white">
                {/* Upload Avatar */}
                <div className="mb-6">
                    <label className="font-semibold text-white">Upload Avatar</label>

                    <div
                        className="mt-2 border-2 border-dotted border-white/40 rounded-xl py-6 flex flex-col items-center gap-3 cursor-pointer bg-purple-400/10 transition hover:bg-purple-400/20"
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {avatar ? (
                            <img
                                src={URL.createObjectURL(avatar)}
                                className="w-20 h-20 rounded-xl object-cover shadow-lg"
                                alt="avatar"
                            />
                        ) : (
                            <>
                                <div className="w-12 h-12 flex items-center justify-center bg-white/20 border border-white/30 rounded-xl backdrop-blur-sm shadow-md">
                                    <img src={iconUpload} className="w-8 opacity-90" alt="iconUpload" />
                                </div>
                                <p className="text-white/90 font-medium">Drag and drop or click to upload</p>
                            </>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={(e) => validateFile(e.target.files[0])}
                    />

                    {/* Info */}
                    <div className="flex items-start gap-2 text-sm text-white/70 mt-2">
                        <img src={iconInfo} className="w-4 h-4 mt-0.5" alt="iconInfo" />
                        <p>
                            {errors.avatar ? (
                                <span className="text-red-400">{errors.avatar}</span>
                            ) : (
                                "Upload your photo (JPG or PNG, max size: 500KB)."
                            )}
                        </p>
                    </div>
                </div>

                {/* Full Name */}
                <div className="mb-5">
                    <label className="font-semibold">Full Name</label>
                    <input
                        type="text"
                        className="mt-2 w-full p-3 rounded-lg bg-purple-400/10 border border-white/30"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    {errors.fullName && (
                        <div className="flex items-center gap-1 mt-1">
                            <img src={iconInfo} className="w-4 h-4" alt="info icon" />
                            <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="font-semibold">Email Address</label>
                    <input
                        type="text"
                        className="mt-2 w-full p-3 rounded-lg bg-purple-400/10 border border-white/30"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && (
                        <div className="flex items-center gap-1 mt-1">
                            <img src={iconInfo} className="w-4 h-4" alt="info icon" />
                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        </div>
                    )}
                </div>

                {/* GitHub */}
                <div className="mb-6">
                    <label className="font-semibold">GitHub Username</label>
                    <input
                        type="text"
                        className="mt-2 w-full p-3 rounded-lg bg-purple-400/10 border border-white/30"
                        value={form.github}
                        onChange={(e) => setForm({ ...form, github: e.target.value })}
                    />
                    {errors.github && (
                        <div className="flex items-center gap-1 mt-1">
                            <img src={iconInfo} className="w-4 h-4" alt="info icon" />
                            <p className="text-red-400 text-sm mt-1">{errors.github}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-400 hover:bg-red-500 transition text-black p-3 rounded-xl font-bold text-lg"
                >
                    Generate My Ticket
                </button>
            </form>
        </>
    );
};

export default Form;
