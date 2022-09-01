import { useRef } from 'react';
import style from './EquipmentBtn.module.css';
import {
    handelSubmitNote,
    handelSubmitTypingType,
    handelSubmitRadioType,
} from '../../handelComponents/createDataSubmit';

function EquipmentBtn({ title = '...', radio, typing }) {
    const wrapRef = useRef(); //tao them chiếu tới element để ẩn hiện content

    let item = []; //tạo mảng để lưu Title (mới có thể dùng phương thức Map())

    for (const key in title) {
        //đưa các Title equipment vào mảng
        item.push(key);
    }

    return item.map((crr, index) => {
        if (crr === 'level') return;
        return (
            <div className={style.wrap} ref={wrapRef} key={index}>
                <div
                    className={style.title}
                    onClick={(e) => {
                        handelHide(e, wrapRef.current);
                    }}
                >
                    {crr}
                </div>
                {(function (dataInput) {
                    let arrayContent = [];
                    for (const key in dataInput) {
                        arrayContent.push(key);
                    }

                    return arrayContent.map((crrKey, index) => {
                        switch (dataInput[crrKey].type) {
                            case 'radio': {
                                // return RadioType(dataInput[crrKey], crrKey, crr);
                                return (
                                    <RadioType
                                        dataInput={dataInput[crrKey]}
                                        keyCrr={crrKey}
                                        // keyParent={crr}
                                        key={index}
                                    />
                                );
                            }
                            case 'temperature': {
                                return (
                                    <TypingType
                                        dataInput={dataInput[crrKey]}
                                        keyCrr={crrKey}
                                        // keyParent={crr}
                                        key={index}
                                    />
                                );
                                // return TypingType(dataInput[crrKey], crrKey, crr);
                            }
                            case 'note': {
                                return (
                                    <NoteType
                                        dataInput={dataInput[crrKey]}
                                        index={index}
                                        key={index}
                                        keyCrr={crrKey}
                                        keyParent={crr}
                                    />
                                );
                            }
                        }
                    });
                })(title[crr])}
            </div>
        );
    });
}
export default EquipmentBtn;

// ////////////////////////////////////////////////////////////////

function handelHide(e, ref) {
    const temp = [...e.target.closest(`.${style.wrap}`).children];
    temp.shift(); //cắt element đầu mảng (title)
    temp.map((crr, index) => {
        crr.classList.toggle(style.hide);
    });
}

// RadioType
function RadioType({ dataInput, keyCrr }) {
    return (
        <div className={`${style.content} ${style.hide}`} key={keyCrr}>
            <span className={style.description}>{keyCrr}</span>

            <div className={style.radioType}>
                <label className={style.radioLabel}>
                    {dataInput.content.normal}
                    <input
                        type="radio"
                        className={style.radioCheck}
                        name={`${dataInput.doc}/${keyCrr}`}
                        data-doc-ref={dataInput.doc.replace('/Group', '')}
                        data-item-ref={keyCrr}
                        onChange={(e) => {
                            handelSubmitRadioType(e.target, 'normal');
                        }}
                    />
                </label>
                <label className={style.radioLabel}>
                    {dataInput.content.issue}
                    <input
                        type="radio"
                        className={style.radioCheck}
                        name={`${dataInput.doc}/${keyCrr}`}
                        data-doc-ref={dataInput.doc.replace('/Group', '')}
                        data-item-ref={keyCrr}
                        onChange={(e) => {
                            handelSubmitRadioType(e.target, 'issue');
                        }}
                    />
                </label>
            </div>
        </div>
    );
}

// TypingType

function TypingType({ dataInput, keyCrr }) {
    return (
        <div className={`${style.content} ${style.hide}`} key={keyCrr}>
            <span className={style.description}>{keyCrr}</span>
            <div className={style.typingType}>
                {dataInput.content.map((crr, index) => {
                    return (
                        <label className={style.typingLabel} key={index}>
                            {crr}
                            <input
                                type="number"
                                className={style.typingCheck}
                                name={`${dataInput.doc}/${keyCrr}`}
                                data-doc-ref={dataInput.doc.replace('/Group', '')}
                                data-item-ref={keyCrr}
                                onChange={(e) => {
                                    handelSubmitTypingType(e.target, crr);
                                }}
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

/////////////////////
function NoteType({ dataInput, index, keyCrr, keyParent }) {
    return (
        <div key={index} className={`${style.noteTitle} ${style.hide}`}>
            <h5 className={style.noteTitle}>{keyCrr}</h5>
            <input
                className={style.noteInput}
                type="text"
                placeholder={`Nhập ghi chú ( ${keyParent} )`}
                data-doc-ref={dataInput.doc.replace('/Group', '')}
                data-item-ref={keyCrr}
                onChange={(e) => {
                    handelSubmitNote(e.target, 'normal');
                }}
            />
        </div>
    );
}
