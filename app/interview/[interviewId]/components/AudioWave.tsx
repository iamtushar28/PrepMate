const AudioWave = () => {
    return (
        <div className="flex items-center gap-1 h-10">

            <span className="w-1 h-3 bg-[#10A37F] rounded-full animate-bounce" />

            <span
                className="w-1 h-6 bg-[#10A37F] rounded-full animate-bounce"
                style={{
                    animationDelay:
                        "100ms",
                }}
            />

            <span
                className="w-1 h-8 bg-[#10A37F] rounded-full animate-bounce"
                style={{
                    animationDelay:
                        "200ms",
                }}
            />

            <span
                className="w-1 h-5 bg-[#10A37F] rounded-full animate-bounce"
                style={{
                    animationDelay:
                        "300ms",
                }}
            />

            <span
                className="w-1 h-7 bg-[#10A37F] rounded-full animate-bounce"
                style={{
                    animationDelay:
                        "400ms",
                }}
            />

        </div>
    );
};

export default AudioWave;