import style from './Header.module.css';

function Header({ parentRef, time, callBack }) {
    const title = parentRef.length > 1 ? parentRef[parentRef.length - 1] : 'Bảo Trì Điện Lò Cao';

    return (
        <>
            <header className={style.header}>
                <div
                    className={`fa-solid fa-arrow-left fz1r4 ${style.button}`}
                    onClick={(e) => {
                        if (parentRef.length > 1) {
                            parentRef.pop();
                            callBack(parentRef);
                        }
                    }}
                ></div>

                <div className={style.headerWrap}>
                    {/* Title */}
                    <span className={style.title}>{title}</span>
                    {/* Date and Shift */}
                    <div>
                        <span className={style.time}>{time}</span>
                        <span className={style.shift}>Ca D</span>
                    </div>
                </div>
                <i className={`fa-solid fa-bars fz1r4`}></i>
            </header>
            <div className={style.headerMarginBottom}></div>
        </>
    );
}

export default Header;
