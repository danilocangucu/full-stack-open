import { DiaryEntry } from "../../../flight-diary-main/src/types"

const Entry = (diaryEntry: DiaryEntry) => (
    <>
        <h2>{diaryEntry.date}</h2>
        <p>visibility: {diaryEntry.visibility}<br />
            weather: {diaryEntry.weather}<br />
            comment: {diaryEntry.comment}</p>
    </>
)

export default Entry