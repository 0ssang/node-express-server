## logs/sample.log 파일을 가지고 셸 스크립트 작성해보기


# 상위 디렉토리 밑에 존재하는 logs 디렉토리의 모든 .log 파일 삭제하기
find ../logs -name "*.txt" -type f -exec rm -f {} +

# 로그파일을 로그레벨별로 추출하기
awk '$1 == "error" { print > "../logs/errorLog.txt" }
     $1 == "default" { print > "../logs/defaultLog.txt" }
     $1 == "info" { print > "../logs/infoLog.txt" }' ../logs/sample.log


echo "logs 디렉토리에 로그 레벨별 로그가 생성됨"