
export class movieMOdel {
  constructor(movieImg, country, title, originalTitle, wishCount, commentCount, year, generes, stars, score, director, casts, castsInfo, summary) {
    this.movieImg = movieImg,
    this.country = country,
    this.title = title,
    this.originalTitle = originalTitle,
    this.wishCount = wishCount,
    this.commentCount = commentCount,
    this.year = year,
    this.generes = generes,
    this.stars = stars,
    this.score = score,
    this.director = director,
    this.casts = casts,
    this.castsInfo = castsInfo,
    this.summary = summary
  }
};

/**
 *  创建电影详情对象函数
 */
export function createMovieModel(data) {

  if (!data) {
    return;
  }
  var director = {
    img: "",
    name: "",
    id: ""
  }
  if (data.directors[0] != null) {
    if (data.directors[0].avatars != null) {
      director.img = data.directors[0].avatars.large

    }
    director.name = data.directors[0].name;
    director.id = data.directors[0].id;
  }
  let img = data.images ? data.images.large : "";
  let tempDirector = [];
  tempDirector.push(director); 
  let temp = [].concat(tempDirector, convertToCastInfos(data.casts));
  return new movieMOdel(
    img,
    data.countries[0],
    data.title,
    data.original_title,
    data.wish_count,
    data.comments_count,
    data.year,
    data.genres.join("、"),
    data.rating.stars,
    data.rating.average,
    director,
    convertToCastString(data.casts),
    temp,
    data.summary
  );
};

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
};

function convertToCastInfos(casts) {
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name,
      id:casts[idx].id
    }
    castsArray.push(cast);
  }
  return castsArray;
};