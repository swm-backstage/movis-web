import axios from "axios";

export async function getExcelFile(clubId) {
    try {
        const response = await axios.get(
            `https://af6goysqqzxfiinvs2ukcewhqq0ptgff.lambda-url.ap-northeast-2.on.aws/`,
            {
                params: {
                    club_id: clubId,
                },
            }
        );

        const fileUrl = response.data.file_url;

        window.location.href = fileUrl;

        if (!fileUrl) {
            throw new Error('File URL is not provided in the response.');
        }

        return 1;
    } catch (e) {
        console.error(e);
        return -1;
    }
}