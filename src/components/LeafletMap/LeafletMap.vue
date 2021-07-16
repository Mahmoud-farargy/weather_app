<template>
    <div id="leafletMap" class="container">
          <div id="mapid"></div>
    </div>
</template>

<script>
import leaflet from "leaflet";
import { mapBoxKey } from "@/config/info";
export default {
    props: {
       "currentCity":  {
         type: Object,
         required: true
       } 
    },
    data() {
        return {
          mapInitData: {}
        }
    },
    methods: {
      updateMarker(val) {
              if(val && Object.keys(val).length > 0){
                const lat = val?.coord?.lat;
                const lon = val?.coord?.lon;
                if(lat && lon){
                  this.mapInitData?.setView([lat, lon], 13);
                  const marker = leaflet.marker([lat, lon]).addTo(this.mapInitData);
                  marker.bindPopup(`${val?.name}, ${val?.sys?.country || (typeof val?.timezone === "string" &&val?.timezone)}`).openPopup();
                }
              }
      },
    },
    watch: {
      currentCity(val) {
        this.updateMarker(val);
      }
    },
    mounted() {
      this.mapInitData = leaflet.map("mapid");
      this.updateMarker(this.currentCity);
          leaflet
            .tileLayer(
              `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxKey}`,
              {
                attribution: "Mahmoud Farargy",
                maxZoom: 18,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken: mapBoxKey,
              }
            )
            .addTo(this.mapInitData);    
    },
}
</script>

<style >
        #mapid {
            width:100%;
            z-index: 10;
            height: 250px;
        }
        /* .leaflet-tile {
            filter: hue-rotate(180deg) invert(80%);
            -webkit-filter: hue-rotate(180deg) invert(80%);
        } */
        @media only screen and (max-width: 670px) {
                  #leafletMap.container {
                      padding-left: 0;
                      padding-right: 0;
                  }
        }
</style>