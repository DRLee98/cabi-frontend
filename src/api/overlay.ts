import { MapViewCafeFragment } from "__generated__/MapViewCafeFragment";

export const Overlay = (cafe: MapViewCafeFragment) => {
  let contents = `<div style="transform:translateY(-50%);top:-52px;position:relative;background-color:white;padding:10px;border-radius:10px;font-size:12px;">
        ${
          cafe.smallCoverImg &&
          `<img style="width:180px;height:100px;" src=${cafe.smallCoverImg} />`
        }
        <button id="overlayCloseBtn" style="position:absolute;top:0;right:0;background-color:white;border-radius:5px; padding:5px;cursor:pointer;">
            <i class="fas fa-times"></i>
        </button> 
        <div onclick="window.location.href = '/cafe/${
          cafe.id
        }'" style="margin-top:2px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;">
            <span>${cafe.name}</span>
            <div style="font-size: 8px;">
                <i style="color:#ffe92a;" class="fas fa-star"></i>
                <span>${cafe.totalScore} / ${cafe.avgScore}</span>
                <i style="color:#f44336;margin-left:3px;" class="fas fa-heart"></i>
                <span>${cafe.likedUsers?.length}</span>
            </div>
        </div>
        <div style="position: absolute;left: 50%;transform: translateX(-50%)rotate(45deg);background-color: inherit;padding: 8px;"></div>
    </div>`;

  return contents;
};
