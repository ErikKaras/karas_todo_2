import Link from "next/link";

const Header = () => {
    return (
        <>
            <div className="w-full">
                <header className="text-3xl font-extrabold">
                    <Link href="/">
                        Karas<span className="text-red-500 font-extrabold">Todo</span>
                    </Link>
                </header>
            </div>
        </>
    );
};

export default Header;
