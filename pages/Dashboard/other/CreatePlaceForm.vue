<script setup lang="ts">
import { useCategories } from "@@/queries/categories";
import { useCreatePlace } from "@@/queries/plcaes";
import validators from '@@/utils/validators';
import { computed, ref } from 'vue';
const emit = defineEmits(['close'])
const placeForm = ref({
  adress: '',
  name_en:'',
  name_ar:'',
  placeContact:{facebook:'',instagram:'',mobile:''},
  images:[],
  categoryId:''
})
const {data:categories,status:categoriesStatus}=useCategories();
const isLoading=ref(false);
const createPlaceForm = ref()
const createPlace = async () => {

  isLoading.value=true;
  const { status } = await useCreatePlace(placeForm.value)

  if (status.value === 'success')
    emit('close')

  isLoading.value=false;
}

const addImagesToPlaceForm = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        placeForm.value.images.push(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const isValidForm = computed(() => createPlaceForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createPlaceForm"
      validate-on="input"
      @submit.prevent="createPlace()"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="placeForm.name_ar"
              :rules="[validators.rules.userNameRule]"
              label="Arabic name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="placeForm.name_en"
              :rules="[validators.rules.userNameRule]"
              label="English name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
          <VTextField
              v-model="placeForm.adress"
              :rules="[validators.rules.required]"
              label="Address"
              append-inner-icon="mdi-map-marker-outline "
            />
          </VCol>
          <VCol
              cols="12"
              md="6"
              sm="6"
          >
            <VTextField
                v-model="placeForm.placeContact.facebook"
                :rules="[validators.rules.required]"
                label="Facebook"
                append-inner-icon="mdi-facebook"
            />
          </VCol>

          <VCol
              cols="12"
              md="6"
              sm="6"
          >
            <VTextField
                v-model="placeForm.placeContact.instagram"
                :rules="[validators.rules.required]"
                label="Instagram"
                append-inner-icon="mdi-instagram"
            />
          </VCol>
          <VCol
              cols="12"
              md="6"
              sm="6"
          >
            <VTextField
                v-model="placeForm.placeContact.mobile"
                :rules="[validators.rules.required]"
                label="Mobile number"
                append-inner-icon="mdi-phone"
            />
          </VCol>
          
          <VCol  cols="12"
             >
            <VSelect label="Category" density="comfortable" hide-details="auto" variant="outlined" :loading="categoriesStatus=='pending'" v-model="placeForm.categoryId" :items="categories?.result" item-value="id" item-title="name.en" />

            </VCol>
          <VCol
            cols="12"

          >
            <VFileInput
              clearable
              label="Profile image"
              :rules="[validators.rules.required]"
              prepend-icon=""
              append-inner-icon="mdi-cloud-upload-outline"
              @change="addImagesToPlaceForm"
              multiple
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="blue-darken-1"
          @click="$emit('close')"
        >
          Cancel
        </VBtn>
        <VBtn
          color="blue-darken-1"
          variant="elevated"
          type="submit"
          :loading="isLoading"
          :disabled="!isValidForm"
        >
          Save
        </VBtn>
      </VCardActions>
    </VForm>
  </VContainer>
</template>