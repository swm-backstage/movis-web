import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    requestVerificationCode,
    checkVerificationCode,
    acceptInvitation,
    getInviteClubInfo
} from '../server/invite';
import { Button, Container, ErrorText, FormGroup, HeaderImage, Input, Label, LoadingSpinner, PageBackground, Subtitle, Title } from './InvitePage.styled';



const InvitePage = () => {
    const { inviteCode } = useParams();
    const navigate = useNavigate();

    const [clubInfo, setClubInfo] = useState({'clubName':'로딩중','clubImageUrl':'로딩중','clubDescription':''})
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [showVerifyInput, setShowVerifyInput] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const validateInvitation = async () => {
            try {
                setLoading(true);
                const response = await getInviteClubInfo(inviteCode);
                setClubInfo(response);
            } catch (err) {
                setError('유효하지 않은 초대장입니다.');
                alert('유효하지 않은 초대장입니다.')
                navigate('/')
            } finally {
                setLoading(false);
            }
        };
        validateInvitation();
    }, [inviteCode]);

    const handleRequestVerification = async () => {
        if (!phoneNumber) {
            setError('전화번호를 입력해주세요.');
            return;
        }
        try {
            setLoading(true);
            await requestVerificationCode(phoneNumber);
            setShowVerifyInput(true);
            setError('');
        } catch (err) {
            setError(err.message || '인증번호 요청에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckVerification = async () => {
        if (!verifyCode) {
            setError('인증번호를 입력해주세요.');
            return;
        }
        try {
            setLoading(true);
            const result = await checkVerificationCode(phoneNumber, verifyCode);
            if (result === true) {
                setIsPhoneVerified(true);
                setShowVerifyInput(false);
                setError('');
            }
        } catch (err) {
            setError(err.message || '인증번호 확인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptInvitation = async () => {
        if (!isPhoneVerified) {
            setError('전화번호 인증이 필요합니다.');
            return;
        }
        if (!name) {
            setError('이름을 입력해주세요.');
            return;
        }
        try {
            setLoading(true);
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            const {clubId, accessToken, refreshToken} = await verifyMember(name, phoneNumber, entryCode);
            if (accessToken) {
                sessionStorage.setItem('accessToken', accessToken);
            }
            if (refreshToken) {
                sessionStorage.setItem('refreshToken', refreshToken);
            }
            
            if (clubId) {
                navigate(`/clubs/${clubId}`);
            } else {
                setError('입장에 실패했습니다.');
            }
        } catch (err) {
            setError(err.message || '초대 수락에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageBackground>
            <Container>
                <HeaderImage 
                    src="https://velog.velcdn.com/cloudflare/jsb100800/d2c98730-a910-4105-93cb-f27fa2369081/%EA%B7%B8%EB%A6%BC5.png" 
                    alt="Event" />
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
                                disabled={isPhoneVerified}
                                placeholder="이름을 입력하세요"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="phone">전화번호</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={isPhoneVerified}
                                placeholder="전화번호를 입력하세요"
                            />
                            {!isPhoneVerified && (
                                <Button onClick={handleRequestVerification} marginTop="10px">
                                    인증번호 받기
                                </Button>
                            )}
                        </FormGroup>
                        {showVerifyInput && (
                            <FormGroup>
                                <Label htmlFor="verifyCode">인증번호</Label>
                                <Input
                                    id="verifyCode"
                                    type="text"
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value)}
                                    placeholder="인증번호를 입력하세요"
                                />
                                <Button onClick={handleCheckVerification} marginTop="10px">
                                    인증번호 확인
                                </Button>
                            </FormGroup>
                        )}
                        <Button
                            onClick={handleAcceptInvitation}
                            disabled={!isPhoneVerified}
                            marginTop="20px"
                        >
                            초대 수락하기
                        </Button>
                    </>
                )}
            </Container>
        </PageBackground>
    );
};

export default InvitePage;