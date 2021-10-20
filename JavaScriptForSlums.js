// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNWEwZjQxNy03NWM3LTRiNGYtYmViZC0wZWEyNTBjNjgxNzAiLCJpZCI6NTE0MjcsImlhdCI6MTYxODEzNDg0MH0.PyP-K9x8UsKGfEGKBy1ucUd0Yxmq7T6CSvbmQrx-iZ4";

var viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(1),
  }),
});
viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.animation.container.style.display ='none';//Hide the animation control
viewer.timeline.container.style.display ='none';//Hide the timeline control
viewer.geocoder.container.style.display ='none';//Hide the place name search control
viewer.cesiumWidget.creditContainer.style.display ='none';//Hide the ceisum
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);


// Add Cesium OSM buildings to the scene
var Otileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(452318),
  })
);

var tileset1 = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(452386),
  })
);

var tileset2 = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(452388),
  })
);

var osmbuildings = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(452285),
  })
);

Otileset.readyPromise
  .then(function () {
    viewer.zoomTo(Otileset);
  

    // Apply the default style if it exists
    var extras = Otileset.asset.extras;
    if (
      Cesium.defined(extras) &&
      Cesium.defined(extras.ion) &&
      Cesium.defined(extras.ion.defaultStyle)
    ) {
     Otileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }
  })
  .otherwise(function (error) {
    console.log(error);
  });
// Styling functions

// Color by different properties checks for null values since not all
// buildings have the material property.
function highlightBuildingTypes() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${feature['BuildingType']} === 'Houses'", "color('#CD5C5C')"],
        ["${feature['BuildingType']} === 'Shops'", "color('#ADFF2F')"],
        ["${feature['BuildingType']} === 'Amenities'", "color('#4B0082')"],
        ["${feature['BuildingType']} === 'Community Toilet Block'", "color('darkorange')",
        ],
        [true, "color('#F0E68C')"],
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${feature['BuildingType']} === 'Houses'", "color('#CD5C5C')"],
        ["${feature['BuildingType']} === 'Shops'", "color('#ADFF2F')"],
        ["${feature['BuildingType']} === 'Amenities'", "color('#4B0082')"],
        ["${feature['BuildingType']} === 'Community Toilet Block'", "color('darkorange')",
        ],
        [true, "color('#F0E68C')"],
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${feature['BuildingType']} === 'Houses'", "color('#CD5C5C')"],
        ["${feature['BuildingType']} === 'Shops'", "color('#ADFF2F')"],
        ["${feature['BuildingType']} === 'Amenities'", "color('#4B0082')"],
        [true, "color('darkorange')"],
      ],
    },
  });
}



//*****
//Function for occupancy
function colorByOccupancy() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Occupancy']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Locked'", "color('red')"],
        ["${material} === 'Occupied'", "color('Chartreuse')"],
        ["true", "color('DeepSkyBlue')"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Occupancy']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Locked House'", "color('red')"],
        ["${material} === 'Occupied House'", "color('Chartreuse')"],
        ["true", "color('DeepSkyBlue')"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Occupancy']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Locked house'", "color('red')"],
        ["${material} === 'Occupied house'", "color('Chartreuse')"],
        ["true", "color('DeepSkyBlue')"], // This is the else case
      ],
    },
  });
}
//*****End of function


//*****
//Function for Structure Type
function colorByStructuretype() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['StructureType']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Semi-pucca'", "color('cornflowerblue')"],
        ["${material} === 'Kutcha'", "color('brown')"],
        ["${material} === 'Pucca'", "color('seagreen')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['StructureType']}",
    },
    color: {
      conditions: [
       ["${material} === null", "color('white',0)"],
        ["${material} === 'Semi-pucca'", "color('cornflowerblue')"],
        ["${material} === 'Kutcha'", "color('brown')"],
        ["${material} === 'Pucca'", "color('seagreen')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['StructureType']}",
    },
    color: {
      conditions: [
       ["${material} === null", "color('white',0)"],
        ["${material} === 'Semi-pucca'", "color('cornflowerblue')"],
        ["${material} === 'Kutcha'", "color('brown')"],
        ["${material} === 'Pucca'", "color('seagreen')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function


//*****
//Function for ownership status
function colorByOwnership() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['OwnershipStatus']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Own house'", "color('yellow')"],
        ["${material} === 'Tenant'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['OwnershipStatus']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Own house'", "color('yellow')"],
        ["${material} === 'Tenant'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['OwnershipStatus']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Own house'", "color('yellow')"],
        ["${material} === 'Tenant'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function


//*****
//Function for colour before SBM
function colorByPreSBM() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PreSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Use CTB'", "color('crimson')"],
        ["${material} === 'Own toilet'", "color('yellowgreen')"],
        ["${material} === 'Shared toilet'", "color('yellow')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PreSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Use CTB'", "color('crimson')"],
        ["${material} === 'Own toilet'", "color('yellowgreen')"],
        ["${material} === 'Shared toilet'", "color('yellow')"],
        ["${material} === 'All defecate in open'", "color('purple')"],
        ["${material} === 'Non functional, hence CTB'", "color('palevioletred')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PreSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Use CTB'", "color('crimson')"],
        ["${material} === 'Own toilet'", "color('yellowgreen')"],
        ["${material} === 'Shared toilet'", "color('yellow')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function

//*****
//Function for interest in household toilets
function colorByHHToilet() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['InterestInHouseholdToilet']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Yes'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['InterestInHouseholdToilet']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Yes'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['InterestInHouseholdToilet']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Yes'", "color('crimson')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function

//*****
//Function for colour after SBM
function colorByPostSBM() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PostSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Yes'", "color('royalblue')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PostSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Household Toilet under SBM'", "color('royalblue')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['Sanitation_PostSBM']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Household Toilet under SBM'", "color('royalblue')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function

//*****
//Function for colour by water connection
function colorByWaterConnection() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['WaterConnection']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Individual connection'", "color('royalblue')"],
        ["${material} === 'Shared Connection'", "color('palevioletred')"],
        ["${material} === 'Water Standpost'", "color('red')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['WaterConnection']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Individual connection'", "color('royalblue')"],
        ["${material} === 'Shared Connection'", "color('palevioletred')"],
        ["${material} === 'Water Standpost'", "color('red')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['WaterConnection']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Individual connection'", "color('royalblue')"],
        ["${material} === 'Shared connection'", "color('palevioletred')"],
        ["${material} === 'Water standpost'", "color('red')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function

//***** 
//Function for colour by waste disposal system
function colorByWasteDisposal() {
  Otileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['SolidWasteCollectionFacility']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Along/Inside canal'", "color('MediumAquaMarine')"],
        ["${material} === 'Garbage bin'", "color('Chartreuse')"],
        ["${material} === 'Open space'", "color('brown')"],
        ["${material} === 'ULB Service'", "color('yellow')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset1.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['SolidWasteCollectionFacility']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Along/Inside canal'", "color('MediumAquaMarine')"],
        ["${material} === 'Garbage bin'", "color('Chartreuse')"],
        ["${material} === 'Open space'", "color('brown')"],
        ["${material} === 'Door to Door waste collection'", "color('deeppink')"],
        ["${material} === 'ULB Service'", "color('yellow')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
  
  tileset2.style = new Cesium.Cesium3DTileStyle({
    defines: {
      material: "${feature['SolidWasteCollectionFacility']}",
    },
    color: {
      conditions: [
        ["${material} === null", "color('white',0)"],
        ["${material} === 'Garbage bin'", "color('Chartreuse')"],
        ["${material} === 'Open space'", "color('brown')"],
        ["${material} === 'ULB Service'", "color('yellow')"],
        ["true", "color('white',0)"], // This is the else case
      ],
    },
  });
}
//*****End of function

// remove the left click input event for selecting a central location
function removeCoordinatePickingOnLeftClick() {
  document.querySelector(".infoPanel").style.visibility = "hidden";
  handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// Add event listeners to dropdown menu options
document.querySelector(".infoPanel").style.visibility = "hidden";
var menu = document.getElementById("dropdown");


menu.options[0].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  highlightBuildingTypes();
};

menu.options[1].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByOccupancy();
};

menu.options[2].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByStructuretype();
};

menu.options[3].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByOwnership();

};

menu.options[4].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByPreSBM();

};

menu.options[5].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByHHToilet();

};

menu.options[6].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByPostSBM();

};

menu.options[7].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByWaterConnection();

};

menu.options[8].onselect = function () {
  removeCoordinatePickingOnLeftClick();
  colorByWasteDisposal();

};


highlightBuildingTypes();

menu.onchange = function () {
  Sandcastle.reset();
  var item = menu.options[menu.selectedIndex];
  if (item && typeof item.onselect === "function") {
    item.onselect();
  }
};

//********************
///For selecting feature
// HTML overlay for showing feature name on mouseover
var nameOverlay = document.createElement("div");
viewer.container.appendChild(nameOverlay);
nameOverlay.className = "backdrop";
nameOverlay.style.display = "none";
nameOverlay.style.position = "absolute";
nameOverlay.style.bottom = "0";
nameOverlay.style.left = "0";
nameOverlay.style["pointer-events"] = "none";
nameOverlay.style.padding = "4px";
nameOverlay.style.backgroundColor = "black";


// Information about the currently selected feature
var selected = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};

// An entity object which will hold info about the currently selected feature for infobox display
var selectedEntity = new Cesium.Entity();

// Get default left click handler for when a feature is not picked on left click
var clickHandler = viewer.screenSpaceEventHandler.getInputAction(
  Cesium.ScreenSpaceEventType.LEFT_CLICK
);

// If silhouettes are supported, silhouette features in blue on mouse over and silhouette green on mouse click.
// If silhouettes are not supported, change the feature color to yellow on mouse over and green on mouse click.
if (
  Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)
) {
  // Silhouettes are supported
  var silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteBlue.uniforms.color = Cesium.Color.BLUE;
  silhouetteBlue.uniforms.length = 0.01;
  silhouetteBlue.selected = [];

  var silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouetteGreen.uniforms.color = Cesium.Color.LIME;
  silhouetteGreen.uniforms.length = 0.01;
  silhouetteGreen.selected = [];

  viewer.scene.postProcessStages.add(
    Cesium.PostProcessStageLibrary.createSilhouetteStage([
      silhouetteBlue,
      silhouetteGreen,
    ])
  );

  // Silhouette a feature blue on hover.
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
    movement
  ) {
    // If a feature was previously highlighted, undo the highlight
    silhouetteBlue.selected = [];

    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pickedFeature)) {
      nameOverlay.style.display = "none";
      return;
    }

    // A feature was picked, so show it's overlay content
    nameOverlay.style.display = "block";
    nameOverlay.style.bottom =
      viewer.canvas.clientHeight - movement.endPosition.y + "px";
    nameOverlay.style.left = movement.endPosition.x + "px";
    var name = pickedFeature.getProperty("BIN");
    nameOverlay.textContent = name;

    // Highlight the feature if it's not already selected.
    if (pickedFeature !== selected.feature) {
      silhouetteBlue.selected = [pickedFeature];
    }
  },
  Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // Silhouette a feature on selection and show metadata in the InfoBox.
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
    movement
  ) {
    // If a feature was previously selected, undo the highlight
    silhouetteGreen.selected = [];

    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.position);
    if (!Cesium.defined(pickedFeature)) {
      clickHandler(movement);
      return;
    }

    // Select the feature if it's not already selected
    if (silhouetteGreen.selected[0] === pickedFeature) {
      return;
    }

    // Save the selected feature's original color
    var highlightedFeature = silhouetteBlue.selected[0];
    if (pickedFeature === highlightedFeature) {
      silhouetteBlue.selected = [];
    }

    // Highlight newly selected feature
    silhouetteGreen.selected = [pickedFeature];

    // Set feature infobox description
    var featureName = pickedFeature.getProperty("Id");
    selectedEntity.name = featureName;
    selectedEntity.description =
      'Loading <div class="cesium-infoBox-loading"></div>';
    viewer.selectedEntity = selectedEntity;
    selectedEntity.description =
      '<table class="cesium-infoBox-defaultTable"><tbody>' +
      "<tr><th>Building Type</th><td>" +
      pickedFeature.getProperty("BuildingType") +
      "</td></tr>" +
      "<tr><th>Building Height</th><td>" +
      pickedFeature.getProperty("Hut_Height") +
      "</td></tr>" +
      "<tr><th>Roof Type</th><td>" +
      pickedFeature.getProperty("RoofType") +
      "</td></tr>" +
      "<tr><th>Longitude</th><td>" +
      pickedFeature.getProperty("Longitude") +
      "</td></tr>" +
      "<tr><th>Latitude</th><td>" +
      pickedFeature.getProperty("Latitude") +
      "</td></tr>" +
      "<tr><th>Terrain Height</th><td>" +
      pickedFeature.getProperty("TerrainHeight") +
      "</td></tr>" +
      "<tr><th>Occupancy Status</th><td>" +
      pickedFeature.getProperty("Occupancy") +
      "</td></tr>" +
      "<tr><th>Structure Type</th><td>" +
      pickedFeature.getProperty("StructureType") +
      "</td></tr>" +
      "</tbody></table>";
  },
  Cesium.ScreenSpaceEventType.LEFT_CLICK);
} else {
  // Silhouettes are not supported. Instead, change the feature color.

  // Information about the currently highlighted feature
  var highlighted = {
    feature: undefined,
    originalColor: new Cesium.Color(),
  };

  // Color a feature yellow on hover.
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
    movement
  ) {
    // If a feature was previously highlighted, undo the highlight
    if (Cesium.defined(highlighted.feature)) {
      highlighted.feature.color = highlighted.originalColor;
      highlighted.feature = undefined;
    }
    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pickedFeature)) {
      nameOverlay.style.display = "none";
      return;
    }
    // A feature was picked, so show it's overlay content
    nameOverlay.style.display = "block";
    nameOverlay.style.bottom =
      viewer.canvas.clientHeight - movement.endPosition.y + "px";
    nameOverlay.style.left = movement.endPosition.x + "px";
    var name = pickedFeature.getProperty("name");
    if (!Cesium.defined(name)) {
      name = pickedFeature.getProperty("id");
    }
    nameOverlay.textContent = name;
    // Highlight the feature if it's not already selected.
    if (pickedFeature !== selected.feature) {
      highlighted.feature = pickedFeature;
      Cesium.Color.clone(
        pickedFeature.color,
        highlighted.originalColor
      );
      pickedFeature.color = Cesium.Color.YELLOW;
    }
  },
  Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // Color a feature on selection and show metadata in the InfoBox.
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
    movement
  ) {
    // If a feature was previously selected, undo the highlight
    if (Cesium.defined(selected.feature)) {
      selected.feature.color = selected.originalColor;
      selected.feature = undefined;
    }
    // Pick a new feature
    var pickedFeature = viewer.scene.pick(movement.position);
    if (!Cesium.defined(pickedFeature)) {
      clickHandler(movement);
      return;
    }
    // Select the feature if it's not already selected
    if (selected.feature === pickedFeature) {
      return;
    }
    selected.feature = pickedFeature;
    // Save the selected feature's original color
    if (pickedFeature === highlighted.feature) {
      Cesium.Color.clone(
        highlighted.originalColor,
        selected.originalColor
      );
      highlighted.feature = undefined;
    } else {
      Cesium.Color.clone(pickedFeature.color, selected.originalColor);
    }
    // Highlight newly selected feature
    pickedFeature.color = Cesium.Color.LIME;

  },
  Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

//-**********************

/// Buttons Addition

Sandcastle.addToggleButton(
  "Jaibhavani Jantavashat Slum", 
  Otileset.show,
  function (checked) {
    Otileset.show = checked;
     Otileset.readyPromise
  .then(function () {
    viewer.zoomTo(Otileset);
       });
  }
);

Sandcastle.addToggleButton(
  "Janta Vashat Slum", 
  tileset1.show,
  function (checked) {
    tileset1.show = checked;
  }
);

Sandcastle.addToggleButton(
  "Kishkindha Nagar Slum", 
  tileset2.show,
  function (checked) {
    tileset2.show = checked;
    tileset2.readyPromise
  .then(function () {
    viewer.zoomTo(tileset2);
       });
  }
        
  
);

Sandcastle.addToggleButton(
  "OSM buildings", 
  osmbuildings.show,
  function (checked) {
    osmbuildings.show = checked;  
  }
);

