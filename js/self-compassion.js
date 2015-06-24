/* self-compassion.js */

// global jQuery
var jQuery

(function ($) {
  // score statement
  function score (id) {
    return parseInt($('#s-' + id).val(), 10)
  }

  // reverse score statement
  function reverseScore (id) {
    return (500 - score(id)) + 100
  }

  // calculate scales and subscales
  function calculate () {
    // Subscale scores are computed by calculating the mean of subscale item responses.
    var selfKindness, selfJudgement, commonHumanity, isolation, mindfulness, overIdentified

    // Self-Kindness: 5, 12, 19, 23, 26
    selfKindness = 0
    $.each([5, 12, 19, 23, 26], function (index, value) {
      selfKindness += score(value)
    })
    selfKindness /= 5

    // Self-Judgment: 1, 8, 11, 16, 21
    selfJudgement = 0
    $.each([1, 8, 11, 16, 21], function (index, value) {
      selfJudgement += score(value)
    })
    selfJudgement /= 5

    // Common Humanity: 3, 7, 10, 15
    commonHumanity = 0
    $.each([3, 7, 10, 15], function (index, value) {
      commonHumanity += score(value)
    })
    commonHumanity /= 4

    // Isolation: 4, 13, 18, 25
    isolation = 0
    $.each([4, 13, 18, 25], function (index, value) {
      isolation += score(value)
    })
    isolation /= 4

    // Mindfulness: 9, 14, 17, 22
    mindfulness = 0
    $.each([9, 14, 17, 22], function (index, value) {
      mindfulness += score(value)
    })
    mindfulness /= 4

    // Over-identified: 2, 6, 20, 24
    overIdentified = 0
    $.each([2, 6, 20, 24], function (index, value) {
      overIdentified += score(value)
    })
    overIdentified /= 4

    // To compute a total self-compassion score, reverse score the negative
    // subscale items - self-judgment, isolation, and over-identification
    // (i.e., 1 = 5, 2 = 4, 3 = 3. 4 = 2, 5 = 1) - then compute a total mean.
    //
    // (This method of calculating the total score is slightly different than
    // that used in the article referenced above, in which each subscale was
    // added together. However, I find it is easier to interpret the scores
    // if the total mean is used.)
    var totalSelfCompassion

    // Self-Kindness: 5, 12, 19, 23, 26
    // Common Humanity: 3, 7, 10, 15
    // Mindfulness: 9, 14, 17, 22
    totalSelfCompassion = 0
    $.each([3, 5, 7, 9, 10, 12, 14, 15, 17, 19, 22, 23, 26], function (index, value) {
      totalSelfCompassion += score(value)
    })

    // Self-Judgment: 1, 8, 11, 16, 21
    // Isolation: 4, 13, 18, 25
    // Over-identified: 2, 6, 20, 24
    $.each([1, 2, 4, 6, 8, 11, 13, 16, 18, 20, 21, 24, 25], function (index, value) {
      totalSelfCompassion += reverseScore(value)
    })
    totalSelfCompassion /= 26

    // update scale and subscale range sliders
    $('#ss-self-kindness').val(selfKindness).change()
    $('#ss-self-judgement').val(selfJudgement).change()
    $('#ss-common-humanity').val(commonHumanity).change()
    $('#ss-isolation').val(isolation).change()
    $('#ss-mindfulness').val(mindfulness).change()
    $('#ss-over-identified').val(overIdentified).change()
    $('#ss-total-self-compassion').val(totalSelfCompassion).change()
  }

  $(function () {
    // initialize scale and subscale range sliders
    $('.scale,.subscale').rangeslider({
      polyfill: false
    })

    // initialize statement range sliders
    $('.statement').rangeslider({
      polyfill: false,
      onSlide: function (position, value) {
        calculate()
      }
    })

  })

}(jQuery))
