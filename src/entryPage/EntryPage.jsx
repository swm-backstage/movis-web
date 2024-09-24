import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyMember, getEntryClubInfo } from '../server/entry';
import {
    Button, Container, ErrorText, FormGroup, HeaderImage, Input, Label, LoadingSpinner, PageBackground, Subtitle, Title
} from './EntryPage.styled';

const EntryPage = () => {
    const { entryCode } = useParams();
    const navigate = useNavigate();

    const [clubInfo, setClubInfo] = useState({ 'clubName': '로딩중', 'clubImageUrl': '로딩중', 'clubDescription': '' });
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadClubInfo = async () => {
            try {
                setLoading(true);
                const response = await getEntryClubInfo(entryCode);
                setClubInfo(response);
            } catch (err) {
                setError('유효하지 않은 입장 코드입니다.');
                alert('유효하지 않은 입장 코드입니다.');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        loadClubInfo();
    }, [entryCode, navigate]);

    const handleEntry = async () => {
        if (!name || !phoneNumber) {
            setError('이름과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const clubId = await verifyMember(name, phoneNumber, entryCode);
            if (clubId) {
                navigate(`/clubs/${clubId}`);
            } else {
                setError('입장에 실패했습니다.');
            }
        } catch (err) {
            setError(err.message || '입장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageBackground>
            <Container>
                <HeaderImage
                    src="https://velog.velcdn.com/cloudflare/jsb100800/d2c98730-a910-4105-93cb-f27fa2369081/%EA%B7%B8%EB%A6%BC5.png"
                    alt="Club Event"
                />
                <Title>{clubInfo.clubName}</Title>
                <Subtitle>{clubInfo.clubDescription}</Subtitle>

                {error && <ErrorText>{error}</ErrorText>}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <FormGroup>
                            <Label htmlFor="name">이름</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름을 입력하세요"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="phoneNumber">전화번호</Label>
                            <Input
                                id="phoneNumber"
                                type="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="전화번호를 입력하세요"
                            />
                        </FormGroup>
                        <Button onClick={handleEntry} marginTop="20px">
                            입장하기
                        </Button>
                    </>
                )}
            </Container>
        </PageBackground>
    );
};

export default EntryPage;