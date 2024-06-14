import { Card, CardMedia, Divider, Grid, ImageList, ImageListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
    const profile: string = 
"明治大学大学院先端数理科学研究科の博士前期課程に在籍し，HCI（ヒューマンコンピュータインタラクション）の分野を研究\n\
主に初心者の運転支援や，手書き文字練習の支援，スマートフォン利用時の姿勢矯正に関する研究に着手\n\
また，ソフトウェアエンジニアとしてプログラミングスキルを活かしシステム開発にも着手\n\
主にwebアプリケーションの開発に携わり，フロントエンド，バックエンド，インフラなど幅広く経験\n\
";
    const hobbys: string[] = ["ドラム", "サッカー", "卓球", "スポーツ観戦", "邦ロック", "J-POP", "謎解き"];
    const career: { year: string, content: string }[] = [
        { year: "2020/03", "content": "明治大学付属明治高等学校卒業" },
        { year: "2020/04", "content": "明治大学総合数理学部先端メディアサイエンス学科入学" },
        { year: "2024/03", "content": "明治大学総合数理学部先端メディアサイエンス学科卒業" },
        { year: "2024/04", "content": "明治大学大学院先端数理科学研究科先端メディアサイエンス専攻入学" },
    ];

    const skills = [
        "git","github","vscode","linux","bash","nginx",
        "mysql","postgresql",
        "unity","cs",
        "java","maven","spring","processing","arduino",
        "php","html","css","js","ts",
        "npm","pnpm","nodejs","jest","vite","react","nextjs","vue","nuxtjs","pinia","svelte","angular","p5js",
        "vuetify","materialui","sass",
        "python","anaconda","tensorflow","django","fastapi","opencv","sklearn",
        "go","docker","firebase",
    ];

    const contentStyle = {
        padding: 4,
        margin: "auto",
        width: "90%",
        maxWidth: "1800px",
    };

    return (
        <Box sx={{ padding: 4, maxWidth: "2400px", margin: "auto" }}>

            <Grid container sx={{ padding: 4 }}>
                <Grid item xs={12} sm={4}>
                    <img src="/profile.JPG" style={{ margin: "20px auto", width: "100%", maxWidth: "700px", objectFit: "contain" }} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h4">
                            Profile
                        </Typography>
                        <Divider />
                        <Box sx={{ padding: 1 }}>
                            <Typography variant="subtitle1">
                                About
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", padding: 1 }}>
                                {profile}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                                Hobby
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", padding: 1 }}>
                                {hobbys.join(", ")}
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>

            <Box sx={contentStyle}>
                <Typography variant="h4">
                    Career
                </Typography>
                <Divider />
                <Table>
                    <TableBody>
                        {career.map((c, i) => (
                            <TableRow key={i}>
                                <TableCell>{c.year}</TableCell>
                                <TableCell>{c.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box sx={contentStyle}>
                <Typography variant="h4">
                    Skills
                </Typography>
                <Divider />
                <ImageList cols={10}>
                    {skills.map((skill, i) => (
                        <ImageListItem key={i}>
                            <img src={`https://skillicons.dev/icons?i=${skill}`} alt={skill} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>

        </Box>
    );
}

export default Home;