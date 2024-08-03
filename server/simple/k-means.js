const cityData = [
    ["0", "서울", "1946", "37.5665", "126.9780", "9720846"],
    ["1", "부산", "1963", "35.1796", "129.0756", "3413841"],
    ["2", "인천", "1981", "37.4563", "126.7052", "2938420"],
    ["3", "대구", "1981", "35.8714", "128.6014", "2414220"],
    ["4", "대전", "1995", "36.3504", "127.3845", "1475221"],
    ["5", "광주", "1986", "35.1595", "126.8526", "1454677"],
    ["6", "울산", "1997", "35.5384", "129.3114", "1159673"],
    ["7", "세종", "2012", "36.4875", "127.2816", "362259"],
    ["8", "수원", "1949", "37.2636", "127.0286", "1240374"],
    ["9", "창원", "2010", "35.2286", "128.6811", "1046188"],
    ["10", "포항", "1949", "36.0190", "129.3435", "511807"],
    ["11", "전주", "1949", "35.8242", "127.1480", "658346"],
    ["12", "청주", "1949", "36.6424", "127.4890", "847110"],
    ["13", "제주", "1955", "33.4996", "126.5312", "486306"],
    ["14", "고양", "1992", "37.6564", "126.8350", "1075500"],
    ["15", "용인", "1996", "37.2411", "127.1776", "1081914"],
    ["16", "천안", "1995", "36.8151", "127.1139", "666417"],
    ["17", "김해", "1995", "35.2342", "128.8811", "559648"],
    ["18", "평택", "1986", "36.9921", "127.1122", "519075"],
    ["19", "마산", "1949", "35.2138", "128.5833", "424192"],
    ["20", "군산", "1949", "35.9672", "126.7364", "266569"],
    ["21", "원주", "1955", "37.3422", "127.9202", "364738"],
    ["22", "의정부", "1963", "37.7389", "127.0455", "442782"],
    ["23", "김포", "1998", "37.6236", "126.7145", "442453"],
    ["24", "광명", "1981", "37.4772", "126.8664", "345262"],
    ["25", "춘천", "1995", "37.8813", "127.7298", "285584"],
    ["26", "안산", "1995", "36.7898", "127.0049", "321355"],
    ["27", "성남", "1973", "37.4200", "127.1265", "944626"],
    ["28", "구미", "1978", "36.1195", "128.3446", "402607"],
    ["29", "시흥", "1989", "37.3803", "126.8031", "446420"],
    ["30", "목포", "1949", "34.8118", "126.3922", "238718"],
    ["31", "익산", "1947", "35.9483", "126.9577", "292524"],
    ["32", "경주", "1955", "35.8562", "129.2247", "257041"],
    ["33", "의왕", "1986", "37.3446", "126.9688", "157346"],
    ["34", "부천", "1973", "37.4989", "126.7831", "843794"],
    ["35", "남양주", "1995", "37.6367", "127.2143", "736287"],
    ["36", "파주", "1997", "37.7598", "126.7805", "453589"],
    ["37", "거제", "1989", "34.8806", "128.6216", "241253"],
    ["38", "화성", "2001", "37.1997", "126.8310", "791057"],
    ["39", "강릉", "1995", "37.7519", "128.8761", "213658"]
]


class City {
    constructor(seq, city, year, latitude, longitude, population) {
        this.seq = seq;
        this.city = city;
        this.year = parseInt(year);
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.population = parseInt(population);
    }
}

class KMeans {
    constructor(data, k, x, y, MAX_ITER = 10) {
        this.data = data;
        this.k = k;
        this.centroids = new Array(k);
        this.clusters = Array(k).fill().map(() => []);
        this.x = x;
        this.y = y;
        this.MAX_ITER = MAX_ITER
    }


    euclideanDistance(point1, point2){
        let distance = point1
        .map((val, idx) => Math.pow(val - point2[idx], 2))
        .reduce((sum, cur) => sum + cur, 0);
        return Math.sqrt(distance);
    };


    initializeCentroids() {
        const selectRandomIndices = new Set();

        while (selectRandomIndices.size < this.k) {
            const randomIndex = Math.floor(Math.random() * this.data.length);
            selectRandomIndices.add(randomIndex);
        }

        let index = 0;
        for (const randomIndex of selectRandomIndices) {
            this.centroids[index] = [this.data[randomIndex][this.x], this.data[randomIndex][this.y]];
            index++;
        }
    }


    assignClusters() {
        this.clusters = Array(this.k).fill().map(() => []);
        this.data.forEach(point => {
            const distance = this.centroids.map(centroid =>
                this.euclideanDistance([point[this.x], point[this.y]], centroid));
            var closestIndex = null;
            for (var i = 0; i < distance.length; i++) {
                if (closestIndex === null || distance[closestIndex] > distance[i]) closestIndex = i;
            }
            this.clusters[closestIndex].push(point)
        })
    }
  

    updateCentroids() {
        this.centroids = this.clusters.map(cluster => {
            const points = cluster.map(point => [point[this.x], point[this.y]]);
            return this.getPointsMean(points);
        });
    }
  
    getPointsMean(points) {
        const totalPoint = points.length;
        const means = [];
        for (let i = 0; i < points[0].length; i++) {
            means.push(0);
        }
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            for (let j = 0; j < point.length; j++) {
                const val = point[j];
                means[j] = means[j] + val / totalPoint;
            }
        }
        return means;
    }

    kmeans() { 
        this.initializeCentroids();
        let prevCent = JSON.stringify(this.centroids);
        let iterationCount = 0;
        while (iterationCount++ < this.MAX_ITER) {
            this.assignClusters();
            this.updateCentroids();
            let curCent = JSON.stringify(this.centroids);
            if (prevCent === curCent) break;
            prevCent = curCent;
        }
        for (let i = 0; i < this.k; i++) {
            console.log(`그룹#${i + 1} 중심값 (${this.centroids[i][0].toFixed(2)}, ${this.centroids[i][1].toFixed(2)})`);
            console.log(`그룹#${i + 1} 도시들 [${this.clusters[i].map(d => d.city).join(", ")}]`);
        }
    }
}


const cities = cityData.map(data => new City(...data));

function kmeans_pop(k) {
    const kmeansPop = new KMeans(cities, k, 'year', 'population');
  	console.log("kmeans_pop 함수 실행");
    kmeansPop.kmeans();
}

function kmeans_long(k) {
    const kmeansLong = new KMeans(cities, k, 'year', 'longitude');
  	console.log("kmeans_long 함수 실행");
    kmeansLong.kmeans();
}


kmeans_pop(4);
kmeans_long(4);