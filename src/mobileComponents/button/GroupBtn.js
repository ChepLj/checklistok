import { useEffect, useState } from 'react';
import { dbRT } from '../../firebase/firebaseConfig';
import { getChildData } from '../../handelComponents/getChildData';
import style from './GroupBtn.module.css';

function GroupBtn({ title = 'Khu Vực ...', parentRef = [], callBack }) {
    const [status, setStatus] = useState({});
    let item = [];

    for (const key in title) {
        item.push(key);
    }

    useEffect(() => {
        getChildData('Result/22-08-31')
            .then((result) => {
                setStatus(result.val());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(parentRef);
    return item.map((crr, index) => {
        if (crr === 'level') return;
        return (
            <div
                className={style.mainWrap}
                key={index}
                onClick={(e) => {
                    const parentElement = e.target.closest(`.${style.mainWrap}`);
                    const targetElement = parentElement.querySelector('.title');
                    parentRef.push(targetElement.innerText);

                    callBack(parentRef);
                    // console.log(parentRef);
                }}
            >
                <div className={`${style.title} title`}>{crr}</div>
                <HandelStatus
                    dataStatusRaw={status.hasOwnProperty(crr) ? status[crr] : []}
                    dataItemRaw={title[crr]}
                    // keyCrr={crr}
                />
            </div>
        );
    });
}

export default GroupBtn;

///////////////////////////
function HandelStatus({ dataStatusRaw, dataItemRaw }) {
    let normal = [];
    let warn = [];
    let error = [];
    let total = [];
    let checked = 0;
    let percent = 0;
    //chuyển thành chuỗi để lọc (không phải dùng vòng lặp)
    const stringStatusConvert = JSON.stringify(dataStatusRaw);
    const stringItemConvert = JSON.stringify(dataItemRaw);

    if (stringStatusConvert) {
        const regexNormalStatus = /"Status":"normal"/gi;
        const regexWarnStatus = /"Status":"warn"/gi;
        const regexErrorStatus = /"Status":"error"/gi;
        const regexIssueStatus = /"Status":"issue"/gi;
        const regexItemCheck = /"Level":"item"/gi;

        const normalStatusResult = stringStatusConvert.match(regexNormalStatus);
        const warnStatusResult = stringStatusConvert.match(regexWarnStatus);
        const errorStatusResult = stringStatusConvert.match(regexErrorStatus);
        const issueStatusResult = stringStatusConvert.match(regexIssueStatus);
        const issueItemCheckResult = stringItemConvert.match(regexItemCheck);
        if (normalStatusResult) normal = normalStatusResult;
        if (warnStatusResult) warn = warnStatusResult;
        if (errorStatusResult) error = errorStatusResult;
        if (issueStatusResult) error = [...error, ...issueStatusResult];
        if (issueItemCheckResult) total = issueItemCheckResult;
        checked = normal.length + warn.length + error.length;
        percent = (checked / total.length) * 100 ? (checked / total.length) * 100 : 0;
    }
    /////
    return (
        <>
            <div className={style.content}>
                ( {warn.length} Warn; {error.length} Error; Checked {checked}/{total.length} )
            </div>
            <div className={style.percent}>{Math.round(percent)}%</div>
        </>
    );
}

/////////////
